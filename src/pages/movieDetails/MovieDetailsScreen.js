import React from 'react';
import { connect } from 'react-redux';
import YoutubeIframe from 'react-native-youtube-iframe';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import Divider from '../../components/divider/Divider';
import PersonItem from './components/personItem/PersonItem';
import { setFavorites } from '../../redux/action/userAction';
import SimilarItem from './components/similarItem/SimilarItem';
import { genericErrorHandling } from '../../utils/errorHandlers';
import CustomImage from '../../components/customImage/CustomImage';
import { getData, getSimilarMovies } from '../../providers/movieDetails';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    stringFormat,
    isItemFavorite,
    getUniqueElements,
    changeFavoriteStatus,
} from '../../utils/utils';
import {
    Styles,
    AppWords,
    PageName,
    CreditType,
    KnownForDepartment,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationGoBack } from '../../navigation/navigation';

class MovieDetailsScreen extends React.Component {
    state = {
        trailer: {},
        details: {},
        credits: {},
        loading: true,
        playing: false,
        wrongData: false,
        similarMovies: [],
    };

    componentDidMount() {
        this.initData();
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
        const {
            user: { favorites },
            route: {
                params: { id, type },
            },
        } = this.props;
        const isFavorite = isItemFavorite(favorites[type], id);
        return (
            <View style={styles.headerContainer}>
                {(playing && this.renderIframe(trailer?.key)) ||
                    (!!details?.poster_path && (
                        <CustomImage source={details?.backdrop_path} style={styles.image} />
                    ))}
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.4}
                    style={styles.backIcon}
                    onPress={() => navigationGoBack(navigation)}>
                    <Icons.Left fill={Styles.white} />
                </TouchableOpacity>
                {!playing && !!trailer?.key && !!details?.poster_path && (
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.4}
                        style={styles.playButton}
                        onPress={() => this.setState({ playing: true })}>
                        <Icons.PlayCircle />
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.4}
                    style={styles.favoriteButton}
                    onPress={this.handleFavoriteButtonClick}>
                    {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                </TouchableOpacity>
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
                {this.renderSimilarMoviesContainer()}
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
                        stringFormat(
                            AppWords.stringFormat,
                            runtime,
                            t('minutes', LanguageLocalizationNSKey.common),
                        ),
                    )}
                {!!vote_average &&
                    this.renderRuntimeOrVoteAverageItem(
                        <Icons.WhiteStar />,
                        stringFormat(
                            AppWords.stringFormat,
                            vote_average?.toFixed(1),
                            AppWords.imdb,
                        ),
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

    renderPerson = ({ id, name, profile_path }, title, navigation) => (
        <PersonItem
            id={id}
            name={name}
            title={title}
            navigation={navigation}
            profilePath={profile_path}
        />
    );

    renderGenreItem = (genre) => (
        <View key={genre?.id} style={styles.genreItem}>
            <Text style={styles.text}>{genre?.name}</Text>
        </View>
    );

    renderSimilarMoviesContainer = () => {
        const { similarMovies } = this.state;
        return (
            !!similarMovies?.length && (
                <>
                    <Text style={styles.subTitle}>
                        {t('relatedMovies', LanguageLocalizationNSKey.common)}
                    </Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={getUniqueElements(similarMovies)}
                        keyExtractor={(item) => item?.id.toString()}
                        renderItem={this.renderSimilarItem}
                    />
                </>
            )
        );
    };

    renderSimilarItem = ({ item }) => {
        const { navigation } = this.props;
        return (
            <SimilarItem
                id={item?.id}
                title={item?.title}
                navigation={navigation}
                date={item?.release_date}
                source={item?.backdrop_path}
            />
        );
    };

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    handleFavoriteButtonClick = () => {
        const { details } = this.state;
        const {
            setFavorites,
            user: { email, favorites },
            route: {
                params: { id, type },
            },
        } = this.props;
        const isFavorite = isItemFavorite(favorites[type], id);
        changeFavoriteStatus(details, type, email, isFavorite, setFavorites);
    };

    initData = async () => {
        const {
            route: {
                params: { id, type, playing },
            },
        } = this.props;
        const isMovie = CreditType.movie === type;
        try {
            const similarMovies = await getSimilarMovies(id, isMovie);
            const { details, credits, videos } = await getData(id, type);
            const trailer = videos?.results?.find((video) => AppWords.trailer === video?.type);
            this.setState({
                details,
                credits,
                trailer,
                playing,
                similarMovies,
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsScreen);
