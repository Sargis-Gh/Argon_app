import React from 'react';
import { connect } from 'react-redux';
import YoutubeIframe from 'react-native-youtube-iframe';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import Divider from '../../components/divider/Divider';
import { getData, getSimilarMovies } from '../../providers/movieDetails';
import { setFavorites } from '../../redux/action/userAction';
import { genericErrorHandling } from '../../utils/errorHandlers';
import CustomImage from '../../components/customImage/CustomImage';
import { getUniqueElements, changeFavoriteStatus } from '../../utils/utils';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
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
import PersonItem from './components/personItem/PersonItem';
import SimilarItem from './components/similarItem/SimilarItem';

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
        const item = this.isItemFavorite();
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
                    onPress={() => this.handleFavoriteButtonClick(item)}>
                    {(item.isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
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
                        `${runtime} ${t('minutes', LanguageLocalizationNSKey.common)}`,
                    )}
                {!!vote_average &&
                    this.renderRuntimeOrVoteAverageItem(
                        <Icons.WhiteStar />,
                        `${vote_average?.toFixed(1)} ${AppWords.imdb}`,
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
        data?.length && (
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
            similarMovies?.length && (
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

    handleFavoriteButtonClick = (item) => {
        const {
            setFavorites,
            user: { email },
        } = this.props;
        console.log('----', item);
        changeFavoriteStatus(item, item.type, email, item.isFavorite, setFavorites);
    };

    isItemFavorite = () => {
        let item = {};
        const {
            user: { favorites },
            route: {
                params: { id, type },
            },
        } = this.props;
        if (CreditType.movie === type) {
            return { isFavorite: favorites.movie.find((item) => id === item.id), type };
        }
        return { isFavorite: favorites.tvSeries.find((item) => id === item.id), type };
    };

    initData = async () => {
        const {
            route: {
                params: { id, type, playing },
            },
        } = this.props;
        try {
            const similarMovies = await getSimilarMovies(id);
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
