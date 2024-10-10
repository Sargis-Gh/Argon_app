import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { getHomeData } from '../../providers/home';
import { apiErrorHandling } from '../../utils/errorHandlers';
import { setFavorites } from '../../redux/action/userAction';
import { analyticsLogEvent } from '../../analytics/analytics';
import CustomImage from '../../components/customImage/CustomImage';
import CustomCarousel from '../../components/customCarousel/CustomCarousel';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    favoritesFirst,
    isItemFavorite,
    getUniqueElements,
    changeFavoriteStatus,
} from '../../utils/utils';
import {
    PageName,
    CreditType,
    HomeScreenDataTitles,
    AnalyticsLogEventName,
    AnalyticsDescriptions,
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
                activeOpacity={0.4}
                onPress={navigation.openDrawer}>
                <Icons.Menu />
            </TouchableOpacity>
            <Text style={styles.title}>{t('title', LanguageLocalizationNSKey.home)}</Text>
        </View>
    );

    renderCarousel = ({ item }) => {
        const {
            navigation,
            user: {
                favorites: { movie },
            },
        } = this.props;
        const isStandard = HomeScreenDataTitles[1] !== item?.title;
        const data = favoritesFirst(getUniqueElements(item?.data), movie);
        const renderItem = (isStandard && this.renderStandardItem) || this.renderNonStandardItem;
        return (
            <CustomCarousel
                data={data}
                title={item?.title}
                navigation={navigation}
                isStandard={isStandard}
                renderItem={renderItem}
            />
        );
    };

    renderStandardItem = ({ item }) => {
        const {
            user: {
                favorites: { movie },
            },
        } = this.props;
        const isFavorite = isItemFavorite(movie, item?.id);
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.carouselItem}
                onPress={() => this.openMovieDetails(item?.id, false)}>
                <CustomImage source={item?.backdrop_path} style={styles.standardItem}>
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.4}
                        style={styles.standardFavoriteIcon}
                        onPress={() => this.handleFavoriteButtonClick(item)}>
                        {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.4}
                        style={styles.standardItemDetails}
                        onPress={() => this.openMovieDetailsAndPlay(item?.id, true)}>
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
                </CustomImage>
            </TouchableOpacity>
        );
    };

    renderNonStandardItem = ({ item }) => {
        const {
            user: {
                favorites: { movie },
            },
        } = this.props;
        const isFavorite = isItemFavorite(movie, item?.id);
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.carouselItem}
                onPress={() => this.openMovieDetails(item?.id, false)}>
                <CustomImage source={item?.backdrop_path} style={styles.nonStandardItem}>
                    <View style={styles.nonStandardRatingFavorite(item?.vote_average)}>
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
                            activeOpacity={0.4}
                            onPress={() => this.handleFavoriteButtonClick(item)}>
                            {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                        </TouchableOpacity>
                    </View>
                    {!!item?.title && (
                        <View style={styles.nonStandardItemDetails}>
                            <Text style={styles.subTitle}>{item?.title}</Text>
                        </View>
                    )}
                </CustomImage>
            </TouchableOpacity>
        );
    };

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    handleFavoriteButtonClick = (item) => {
        const {
            setFavorites,
            user: {
                email,
                favorites: { movie },
            },
        } = this.props;
        const isFavorite = isItemFavorite(movie, item?.id);
        changeFavoriteStatus({
            item,
            email,
            isFavorite,
            setFavorites,
            type: CreditType.movie,
            pageName: PageName.home,
        });
    };

    openMovieDetails = (id, playing) => {
        const { navigation } = this.props;
        navigationNavigate(navigation, PageName.movieDetails, {
            id,
            playing,
            type: CreditType.movie,
            title: t('title', LanguageLocalizationNSKey.home),
        });
    };

    openMovieDetailsAndPlay = (id, playing) => {
        this.openMovieDetails(id, playing);
        analyticsLogEvent(AnalyticsLogEventName.buttonClick, {
            pageName: PageName.home,
            description: AnalyticsDescriptions.readeToPlay,
        });
    };

    initData = async () => {
        try {
            const data = await getHomeData();
            this.setState({ data, loading: false, wrongData: false });
        } catch (error) {
            this.setState({ wrongData: true, loading: false });
            apiErrorHandling(error, PageName.home);
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
