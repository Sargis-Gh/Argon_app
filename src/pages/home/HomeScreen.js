import React from 'react';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { getHomeData } from '../../providers/home';
import { setFavorites } from '../../redux/action/authAction';
import { genericErrorHandling } from '../../utils/errorHandlers';
import CustomCarousel from '../../components/customCarousel/CustomCarousel';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    buildImageUrl,
    favoritesFirst,
    getUniqueElements,
    changeFavoriteStatus,
} from '../../utils/utils';
import {
    PageName,
    CreditType,
    DefaultSource,
    HomeScreenDataTitles,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationNavigate } from '../../navigation/navigation';

class HomeScreen extends React.Component {
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
        const { data } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                {this.renderHeader(navigation)}
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item?.title}
                    ListFooterComponent={<View style={styles.listFooterComponent} />}
                    renderItem={this.renderCarousel}
                />
            </View>
        );
    }

    renderHeader = (navigation) => (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                delayPressIn={100}
                activeOpacity={0.8}
                onPress={navigation.openDrawer}>
                <Icons.Menu />
            </TouchableOpacity>
            <Text style={styles.title}>{t('title', LanguageLocalizationNSKey.home)}</Text>
        </View>
    );

    renderCarousel = ({ item }) => {
        const { navigation } = this.props;
        const isStandard = HomeScreenDataTitles[1] !== item?.title;
        const data = favoritesFirst(getUniqueElements(item?.data), this.isItemFavorite);
        const renderItem = (isStandard && this.renderStandardItem) || this.renderNonStandardItem;
        const bottomDivider = HomeScreenDataTitles[HomeScreenDataTitles.length - 1] !== item?.title;
        return (
            <CustomCarousel
                data={data}
                title={item?.title}
                navigation={navigation}
                isStandard={isStandard}
                bottomDivider={bottomDivider}
                renderItem={renderItem}
            />
        );
    };

    renderStandardItem = ({ item }) => {
        const { navigation } = this.props;
        const isFavorite = this.isItemFavorite(item?.id);
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.carouselItem}
                onPress={() =>
                    navigationNavigate(navigation, PageName.movieDetails, {
                        id: item?.id,
                        type: CreditType.movie,
                        title: t('title', LanguageLocalizationNSKey.home),
                    })
                }>
                <FastImage
                    style={styles.standardItem}
                    defaultSource={DefaultSource.film}
                    resizeMode={FastImage.resizeMode.stretch}
                    source={{ uri: buildImageUrl(item?.backdrop_path) }}>
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.8}
                        style={styles.standardFavoriteIcon}
                        onPress={() => this.handleFavoriteButtonClick(item)}>
                        {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.8}
                        style={styles.standardItemDetails}>
                        <Icons.Play />
                        <View>
                            <Text style={styles.continue}>
                                {t('texts.continue', LanguageLocalizationNSKey.home)}
                            </Text>
                            <Text style={styles.readyPlayer}>
                                {t('texts.readyPlayer', LanguageLocalizationNSKey.home)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </FastImage>
            </TouchableOpacity>
        );
    };

    renderNonStandardItem = ({ item }) => {
        const { navigation } = this.props;
        const isFavorite = this.isItemFavorite(item?.id);
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.carouselItem}
                onPress={() =>
                    navigationNavigate(navigation, PageName.movieDetails, {
                        id: item?.id,
                        type: CreditType.movie,
                    })
                }>
                <FastImage
                    style={styles.nonStandardItem}
                    defaultSource={DefaultSource.film}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: buildImageUrl(item?.backdrop_path) }}>
                    <View style={styles.nonStandardRatingFavorite(!!item?.vote_average)}>
                        {!!item?.vote_average && (
                            <View style={styles.rating}>
                                <Icons.StarHalf />
                                <Text style={styles.ratingValue}>
                                    {item?.vote_average?.toFixed(1)}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity
                            delayPressIn={100}
                            activeOpacity={0.8}
                            onPress={() => this.handleFavoriteButtonClick(item)}>
                            {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                        </TouchableOpacity>
                    </View>
                    {!!item?.title && (
                        <View style={styles.nonStandardItemDetails}>
                            <Text style={styles.subTitle}>{item?.title}</Text>
                        </View>
                    )}
                </FastImage>
            </TouchableOpacity>
        );
    };

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    handleFavoriteButtonClick = (item) => {
        const isFavorite = this.isItemFavorite(item?.id);
        const {
            setFavorites,
            user: {
                favorites,
                details: { id },
            },
        } = this.props;
        changeFavoriteStatus(isFavorite, id, favorites, setFavorites, item, CreditType.movie);
    };

    isItemFavorite = (id) => {
        const {
            user: { favorites },
        } = this.props;
        return !!favorites.movie.find((item) => id === item.id);
    };

    initData = async () => {
        try {
            const data = await getHomeData();
            this.setState({ data, loading: false, wrongData: false });
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
