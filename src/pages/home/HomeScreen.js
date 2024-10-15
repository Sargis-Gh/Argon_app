import React from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import { TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { getHomeData } from '../../providers/home';
import { apiErrorHandling } from '../../utils/errorHandlers';
import { setFavorites } from '../../redux/action/userAction';
import { analyticsLogEvent } from '../../analytics/analytics';
import CustomImage from '../../components/customImage/CustomImage';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    favoritesFirst,
    isItemFavorite,
    getUniqueElements,
    changeFavoriteStatus,
} from '../../utils/utils';
import {
    Styles,
    PageName,
    CreditType,
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
                {data.length && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        disableScrollViewPanResponder={true}>
                        {this.renderCarousel(data[0])}
                        {data.slice(1, 4).map((item, index) => (
                            <View key={item.id || index}>{this.renderFlatList(item)}</View>
                        ))}
                    </ScrollView>
                )}
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

    renderCarousel = (item) => {
        const {
            navigation,
            user: {
                favorites: { movie },
            },
        } = this.props;
        const data = favoritesFirst(getUniqueElements(item?.data), movie);
        return (
            <Carousel
                data={data}
                loop={false}
                autoFillData={false}
                pagingEnabled={true}
                mode={Styles.parallax}
                {...styles.baseOptions}
                panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
                renderItem={this.renderStandardItem}
            />
        );
    };

    renderFlatList = (item) => {
        const { data } = this.state;
        const renderItem =
            (item?.title === data[1]?.title && this.renderNonStandardItem) ||
            this.renderStandardItem;
        return (
            <>
                <Text style={styles.subTitle}>
                    {t(item.title, LanguageLocalizationNSKey.common)}
                </Text>
                <FlatList
                    horizontal
                    data={getUniqueElements(item.data)}
                    keyExtractor={(item) => item?.title}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => renderItem(item, true)}
                />
            </>
        );
    };

    renderStandardItem = ({ item }, isFlatListItem) => {
        const {
            user: {
                favorites: { movie },
            },
        } = this.props;
        const isFavorite = isItemFavorite(movie, item?.id);
        const style = (isFlatListItem && styles.flatListItem(true)) || styles.carouselItem;
        return (
            <TouchableOpacity
                style={style}
                activeOpacity={1}
                delayPressIn={100}
                onPress={() => this.openMovieDetails(item?.id, false)}>
                <CustomImage source={item?.backdrop_path} style={styles.item}>
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
                style={styles.flatListItem(false)}
                onPress={() => this.openMovieDetails(item?.id, false)}>
                <CustomImage source={item?.backdrop_path} style={styles.item}>
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
