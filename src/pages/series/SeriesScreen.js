import React from 'react';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { getTVSerisData } from '../../providers/tvSeries';
import { setFavorites } from '../../redux/action/authAction';
import MovieItem from '../../components/movieItem/MovieItem';
import { genericErrorHandling } from '../../utils/errorHandlers';
import { buildImageUrl, favoritesFirst } from '../../utils/utils';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    PageName,
    CreditType,
    DefaultSource,
    SeriesScreenDataTitles,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationNavigate } from '../../navigation/navigation';

class SeriesScreen extends React.Component {
    state = {
        data: [],
        loading: true,
        wrongData: false,
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        const { loading, wrongData } = this.state;
        if (loading) return <CustomActivityIndicator />;
        if (wrongData)
            return (
                <WrongDataScreen navigationBar={false} clickRetryButton={this.clickRetryButton} />
            );
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{t('title', LanguageLocalizationNSKey.tvSeries)}</Text>
                {this.renderTVSeriesContainer()}
            </View>
        );
    }

    renderTVSeriesContainer = () => {
        const { data } = this.state;
        return (
            <FlatList
                data={data}
                style={styles.tvSeriesContainer}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={styles.footer} />}
                renderItem={this.renderList}
            />
        );
    };

    renderList = ({ item }) => {
        const data = favoritesFirst(item.data, this.isItemFavorite);
        const renderItem =
            (item.title === SeriesScreenDataTitles[0] && this.renderSmallItem) ||
            this.renderMovieItem;
        return (
            <>
                <Text style={styles.listTitle}>
                    {t(`texts.${item.title}`, LanguageLocalizationNSKey.tvSeries)}
                </Text>
                <FlatList
                    horizontal
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </>
        );
    };

    renderSmallItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.item}
                onPress={() => this.openMovieDetails(item?.id)}>
                <FastImage
                    style={styles.image}
                    defaultSource={DefaultSource.film}
                    resizeMode={FastImage.resizeMode.stretch}
                    source={{ uri: buildImageUrl(item?.poster_path) }}
                />
            </TouchableOpacity>
        );
    };

    renderMovieItem = ({ item }) => {
        const {
            navigation,
            setFavorites,
            user: {
                favorites,
                details: { id },
            },
        } = this.props;
        const isFavorite = this.isItemFavorite(item.id);
        return (
            <MovieItem
                item={item}
                userId={id}
                favorites={favorites}
                navigation={navigation}
                isFavorite={isFavorite}
                type={CreditType.tvSeries}
                setFavorites={setFavorites}
            />
        );
    };

    isItemFavorite = (id) => {
        const {
            user: { favorites },
        } = this.props;
        return !!favorites.tvSeries.find((item) => id === item.id);
    };

    openMovieDetails = (id) => {
        const { navigation } = this.props;
        navigationNavigate(navigation, PageName.movieDetails, { id, type: CreditType.tvSeries });
    };

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    initData = async () => {
        try {
            const data = await getTVSerisData();
            this.setState({
                data,
                loading: false,
                wrongData: false,
            });
        } catch (error) {
            this.setState({ wrongData: true, loading: false });
            genericErrorHandling(error);
        }
    };
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    setFavorites: (updatedFavorites) => dispatch(setFavorites(updatedFavorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeriesScreen);
