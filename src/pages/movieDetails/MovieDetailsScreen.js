import React from 'react';
import FastImage from 'react-native-fast-image';
import YoutubeIframe from 'react-native-youtube-iframe';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { buildImageUrl, getUniqueElements } from '../../utils/utils';
import Divider from '../../components/divider/Divider';
import { getData } from '../../providers/movieDetails';
import { genericErrorHandling } from '../../utils/errorHandlers';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    Styles,
    AppWords,
    PageName,
    DefaultSource,
    KnownForDepartment,
    CarouselItemCountLimit,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationGoBack, navigationPush } from '../../navigation/navigation';

class MovieDetailsScreen extends React.Component {
    state = {
        trailer: {},
        details: {},
        credits: {},
        loading: true,
        playing: false,
        wrongData: false,
    };

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener(AppWords.focus, () => {
            this.initData();
        });
    }

    componentWillUnmount() {
        this.focusListener?.();
    }

    render() {
        const { loading, wrongData } = this.state;
        if (loading) return <CustomActivityIndicator />;
        const {
            navigation,
            route: {
                params: { title },
            },
        } = this.props;
        if (wrongData)
            return (
                <WrongDataScreen
                    title={title}
                    navigation={navigation}
                    pageName={PageName.home}
                    clickRetryButton={this.clickRetryButton}
                />
            );
        const { trailer, details, credits } = this.state;
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {this.renderHeader(details, trailer, navigation)}
                {this.renderAboutMovie(credits, navigation, details)}
            </ScrollView>
        );
    }

    renderHeader = (details, trailer, navigation) => {
        const { playing } = this.state;
        return (
            <View style={styles.headerContainer}>
                {(playing && this.renderIframe(trailer?.key)) ||
                    (!!details?.poster_path && this.renderImage(details?.backdrop_path))}
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.8}
                    style={styles.backIcon}
                    onPress={() => navigationGoBack(navigation)}>
                    <Icons.Left fill={Styles.white} />
                </TouchableOpacity>
                {!playing && !!trailer?.key && !!details?.poster_path && (
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.8}
                        style={styles.playButton}
                        onPress={() => this.setState({ playing: true })}>
                        <Icons.PlayCircle />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    renderIframe = (key) => (
        <YoutubeIframe
            play={true}
            height={225}
            videoId={key}
            width={Styles.fullSize}
            onChangeState={(state) => {
                AppWords.ended === state && this.setState({ playing: false });
            }}
        />
    );

    renderImage = (url) => (
        <FastImage
            style={styles.image}
            defaultSource={DefaultSource.film}
            source={{ uri: buildImageUrl(url) }}
            resizeMode={FastImage.resizeMode.cover}
        />
    );

    renderAboutMovie = (
        { cast },
        navigation,
        { title, runtime, vote_average, release_date, overview, genres },
    ) => {
        return (
            <View style={styles.aboutMovieContainer}>
                {!!title && <Text style={styles.title}>{title}</Text>}
                {(!!runtime || !!vote_average) &&
                    this.renderRuntimeOrVoteAverage(runtime, vote_average)}
                {(!!release_date || !!genres?.length) &&
                    this.renderReleaseDateOrGenres(release_date, genres)}
                {!!overview &&
                    this.renderSubItem(
                        t('synopsis', LanguageLocalizationNSKey.common),
                        <Text style={styles.text}>{overview}</Text>,
                    )}
                {this.renderCredits(cast, navigation)}
                <View style={styles.footer} />
            </View>
        );
    };

    renderRuntimeOrVoteAverage = (runtime, vote_average) => (
        <>
            <View style={styles.minutesAndRatings}>
                {!!runtime &&
                    this.renderRuntimeOrVoteAverageItem(
                        <Icons.Schedule />,
                        runtime + t('minutes', LanguageLocalizationNSKey.common),
                    )}
                {!!vote_average &&
                    this.renderRuntimeOrVoteAverageItem(
                        <Icons.StarHalf />,
                        vote_average?.toFixed(1),
                    )}
            </View>
            <Divider />
        </>
    );

    renderRuntimeOrVoteAverageItem = (icon, text) => (
        <>
            {icon}
            <Text style={styles.text}>{text}</Text>
        </>
    );

    renderReleaseDateOrGenres = (release_date, genres) => (
        <>
            <View style={styles.releaseGenreContainer}>
                {!!release_date &&
                    this.renderSubItem(
                        t('releaseDate', LanguageLocalizationNSKey.common),
                        <Text style={styles.text}>{release_date}</Text>,
                    )}
                {!!genres?.length &&
                    this.renderSubItem(
                        t('genre', LanguageLocalizationNSKey.common),
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {genres?.map((genre) => this.renderGenreItem(genre))}
                        </ScrollView>,
                    )}
            </View>
            <Divider />
        </>
    );

    renderCredits = (cast, navigation) => {
        const actors = [];
        const creators = [];
        cast?.forEach((person) => {
            if (KnownForDepartment.acting === person?.known_for_department) {
                actors.push(person);
                return;
            }
            creators.push(person);
        });
        return (
            <View style={styles.subContainer}>
                {this.renderCreditsItem(
                    creators,
                    navigation,
                    t('creators', LanguageLocalizationNSKey.common),
                )}
                {this.renderCreditsItem(
                    actors,
                    navigation,
                    t('actors', LanguageLocalizationNSKey.common),
                )}
            </View>
        );
    };

    renderSubItem = (subTitle, subItem) => (
        <View style={styles.releaseGenreSubContainer}>
            <Text style={styles.subTitle}>{subTitle}</Text>
            {subItem}
        </View>
    );

    renderCreditsItem = (data, navigation, title) =>
        !!data?.length && (
            <>
                <Text style={styles.subTitle}>{title}</Text>
                <FlatList
                    horizontal
                    data={getUniqueElements(data)}
                    keyExtractor={(item) => item?.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => this.renderPerson(item, title, navigation)}
                />
            </>
        );

    renderPerson = (person, title, navigation) => (
        <TouchableOpacity
            activeOpacity={1}
            delayPressIn={100}
            style={styles.personContainer}
            onPress={() =>
                navigationPush(navigation, PageName.personDetails, { id: person?.id, title })
            }>
            <View style={styles.personImageBackground}>
                <FastImage
                    style={styles.personImage}
                    defaultSource={DefaultSource.person}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: buildImageUrl(person?.profile_path) }}
                />
            </View>
            {!!person?.name && (
                <View style={styles.nameContainer}>
                    <Text numberOfLines={3} style={styles.name}>
                        {person?.name}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );

    renderGenreItem = (genre) => (
        <View key={genre?.id} style={styles.genreItem}>
            <Text style={styles.text}>{genre?.name}</Text>
        </View>
    );

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    initData = async () => {
        const {
            route: {
                params: { id, type },
            },
        } = this.props;
        try {
            const { details, credits, videos } = await getData(id, type);
            const trailer = videos?.results?.find((video) => AppWords.trailer === video?.type);
            this.setState({
                details,
                credits,
                trailer,
                loading: false,
                wrongData: false,
            });
        } catch (error) {
            this.setState({ wrongData: true, loading: false });
            genericErrorHandling(error);
        }
    };
}

export default MovieDetailsScreen;
