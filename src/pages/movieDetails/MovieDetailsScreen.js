import React from 'react';
import FastImage from 'react-native-fast-image';
import YoutubeIframe from 'react-native-youtube-iframe';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { buildImageUrl } from '../../utils/utils';
import Divider from '../../components/divider/Divider';
import { genericErrorHandling } from '../../utils/errorHandlers';
import CustomBlurView from '../../components/customBlurView/CustomBlurView';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import { getMovieDetails, getTVShowsDetails } from '../../providers/movieDetails';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    Styles,
    AppWords,
    PageName,
    CreditType,
    KnownForDepartment,
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
        if (this.focusListener) {
            this.focusListener();
        }
    }

    render() {
        const { navigation } = this.props;
        const { title } = this.props.route.params;
        const { trailer, details, credits, loading, wrongData } = this.state;
        if (loading) return <CustomActivityIndicator />;
        if (wrongData)
            return (
                <WrongDataScreen
                    title={title}
                    navigation={navigation}
                    pageName={PageName.home}
                    clickRetryButton={this.clickRetryButton}
                />
            );
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {this.renderHeader(details, trailer, navigation)}
                {this.renderAboutMovie(credits, details, navigation)}
            </ScrollView>
        );
    }

    renderHeader = (details, trailer, navigation) => {
        const { playing } = this.state;
        const hasTrailer = !!trailer?.key;
        const hasPoster = !!details?.poster_path;
        return (
            <View style={styles.headerContainer}>
                {playing && hasTrailer
                    ? this.renderIframe(trailer?.key)
                    : hasPoster && this.renderImage(details?.backdrop_path)}
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.8}
                    style={styles.backIcon}
                    onPress={() => {
                        navigationGoBack(navigation);
                    }}>
                    <CustomBlurView />
                    <Icons.Left fill={Styles.white} />
                </TouchableOpacity>
                {!!details?.adult && (
                    <View style={styles.adult}>
                        <Icons.Adult />
                    </View>
                )}
                {(!playing && hasTrailer && hasPoster && (
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.8}
                        style={styles.playButton}
                        onPress={() => this.setState({ playing: true })}>
                        <Icons.PlayCircle />
                    </TouchableOpacity>
                )) ||
                    (!playing && !hasTrailer && !hasPoster && <View style={{ height: 40 }}></View>)}
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
                state === AppWords.ended && this.setState({ playing: false });
            }}
        />
    );

    renderImage = (url) => (
        <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: buildImageUrl(url) }}
        />
    );

    renderAboutMovie = (
        { cast },
        { title, runtime, vote_average, release_date, overview, genres },
        navigation,
    ) => (
        <View style={styles.aboutMovieContainer}>
            {!!title && <Text style={styles.movieName}>{title}</Text>}
            <View style={styles.minutesAndRatings}>
                {!!runtime && (
                    <>
                        <Icons.Schedule />
                        <Text style={styles.text}>
                            {runtime} {t('minutes', LanguageLocalizationNSKey.common)}
                        </Text>
                    </>
                )}
                {!!vote_average && (
                    <>
                        <Icons.StarHalf />
                        <Text style={styles.text}>{vote_average?.toFixed(1)}</Text>
                    </>
                )}
            </View>
            {(!!runtime || !!vote_average) && <Divider />}
            <View style={styles.releaseGenreContainer}>
                {!!release_date && (
                    <View style={styles.releaseContainer}>
                        <Text style={styles.titleText}>
                            {t('releaseDate', LanguageLocalizationNSKey.common)}
                        </Text>
                        <Text style={styles.text}>{release_date}</Text>
                    </View>
                )}
                {!!genres && (
                    <View style={styles.genresContainer}>
                        <Text style={styles.titleText}>
                            {t('genre', LanguageLocalizationNSKey.common)}
                        </Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.genreItemsContainer}>
                            {genres?.map((genre) => this.renderGenreItem(genre))}
                        </ScrollView>
                    </View>
                )}
            </View>
            {(!!release_date || !!genres) && <Divider />}
            {!!overview && (
                <View style={styles.description}>
                    <Text style={styles.titleText}>
                        {t('synopsis', LanguageLocalizationNSKey.common)}
                    </Text>
                    <Text style={styles.text}>{overview}</Text>
                </View>
            )}
            {this.renderCredits(cast, navigation)}
            <View style={styles.footer}></View>
        </View>
    );

    renderCredits = (cast, navigation) => {
        const actors = [];
        const creators = [];
        cast?.forEach((person) => {
            if (person.known_for_department === KnownForDepartment.acting) {
                actors.push(person);
            } else if (
                [
                    KnownForDepartment.art,
                    KnownForDepartment.crew,
                    KnownForDepartment.directing,
                ].includes(person.known_for_department)
            ) {
                creators.push(person);
            }
        });
        return (
            <View style={styles.creditsContainer}>
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

    renderCreditsItem = (data, navigation, title) =>
        data.length > 0 && (
            <>
                <Text style={styles.titleText}>{title}</Text>
                <FlatList
                    horizontal
                    data={data}
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
            onPress={() => {
                navigationPush(navigation, PageName.personDetails, { id: person?.id, title });
            }}>
            <View style={styles.personImageBackground}>
                {(!!person?.profile_path && (
                    <FastImage
                        style={styles.personImage}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: buildImageUrl(person?.profile_path) }}
                    />
                )) || <Icons.Person />}
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
        const { id, type } = this.props.route.params;
        try {
            const getData = (CreditType.movie === type && getMovieDetails) || getTVShowsDetails;
            const { details, credits, videos } = await getData(id);
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
