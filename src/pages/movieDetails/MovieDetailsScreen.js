import React from 'react';
import FastImage from 'react-native-fast-image';
import YoutubeIframe from 'react-native-youtube-iframe';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { buildImageUrl } from '../../utils/utils';
import Divider from '../../components/divider/Divider';
import { FlatList } from 'react-native-gesture-handler';
import { getMovieDetails } from '../../providers/movieDetails';
import { genericErrorHandling } from '../../utils/errorHandlers';
import { navigationNavigate } from '../../navigation/navigation';
import CustomBlurView from '../../components/customBlurView/CustomBlurView';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    Styles,
    AppWords,
    PageName,
    KnownForDepartment,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

class MovieDetailsScreen extends React.Component {
    state = {
        trailer: {},
        details: {},
        credits: {},
        loading: true,
        playing: false,
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        const { navigation } = this.props;
        const { trailer, details, credits, loading } = this.state;
        if (loading) return <CustomActivityIndicator />;
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {this.renderHeader(details, trailer, navigation)}
                {this.renderAboutMovie(details, credits, navigation)}
            </ScrollView>
        );
    }

    renderIframe = (key) => {
        return (
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
    };

    renderImage = (url) => (
        <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: buildImageUrl(url) }}
        />
    );

    renderHeader = (details, trailer, navigation) => {
        const { playing } = this.state;
        const hasTrailer = !!trailer?.key;
        const hasPoster = !!details?.poster_path;
        return (
            <View style={styles.headerContainer}>
                {playing && hasTrailer
                    ? this.renderIframe(trailer?.key)
                    : hasPoster && this.renderImage(details?.poster_path)}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.backIcon}
                    onPress={() => navigationNavigate(navigation, PageName.home)}>
                    <CustomBlurView />
                    <Icons.Left />
                </TouchableOpacity>
                {!playing && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.playButton}
                        onPress={() => this.setState({ playing: true })}>
                        <Icons.PlayCircle />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    renderAboutMovie = (
        { title, runtime, vote_average, release_date, overview, genres },
        { cast },
        navigation,
    ) => (
        <View style={styles.aboutMovieContainer}>
            <Text style={styles.movieName}>{title}</Text>
            <View style={styles.minutesAndRatings}>
                <Icons.Schedule />
                <Text style={styles.text}>
                    {runtime} {t('minutes', LanguageLocalizationNSKey.common)}
                </Text>
                <Icons.Star />
                <Text style={styles.text}>{vote_average?.toFixed(1)}</Text>
            </View>
            <Divider />
            <View style={styles.releaseGenreContainer}>
                <View style={styles.releaseContainer}>
                    <Text style={styles.titleText}>
                        {t('releaseDate', LanguageLocalizationNSKey.common)}
                    </Text>
                    <Text style={styles.text}>{release_date}</Text>
                </View>
                <View style={styles.genresContainer}>
                    <Text style={styles.titleText}>
                        {t('genre', LanguageLocalizationNSKey.common)}
                    </Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.genreItemsContainer}>
                        {genres.map((genre) => this.renderGenreItem(genre))}
                    </ScrollView>
                </View>
            </View>
            <Divider />
            <View style={styles.description}>
                <Text style={styles.titleText}>
                    {t('synopsis', LanguageLocalizationNSKey.common)}
                </Text>
                <Text style={styles.text}>{overview}</Text>
            </View>
            {this.renderCredits(cast, navigation)}
            <View style={styles.footer}></View>
        </View>
    );

    renderCredits = (cast, navigation) => {
        const actors = [];
        const creators = [];
        cast.forEach((person) => {
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
                <Text style={styles.titleText}>
                    {t('creators', LanguageLocalizationNSKey.common)}
                </Text>
                <FlatList
                    horizontal
                    data={creators}
                    keyExtractor={(item) => item?.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => this.renderPerson(item, navigation)}
                />
                <Text style={styles.titleText}>
                    {t('actors', LanguageLocalizationNSKey.common)}
                </Text>
                <FlatList
                    horizontal
                    data={actors}
                    keyExtractor={(item) => item?.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => this.renderPerson(item)}
                />
            </View>
        );
    };

    renderPerson = (person) => (
        <TouchableOpacity style={styles.personContainer} activeOpacity={1}>
            <View style={styles.personImageBackground}>
                <FastImage
                    style={styles.personImage}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: buildImageUrl(person?.profile_path) }}
                />
            </View>
            <View style={styles.nameContainer}>
                <Text numberOfLines={3} style={styles.name}>
                    {person?.name}
                </Text>
            </View>
        </TouchableOpacity>
    );

    renderGenreItem = (genre) => (
        <View key={genre?.id} style={styles.genreItem}>
            <Text style={styles.text}>{genre?.name}</Text>
        </View>
    );

    initData = async () => {
        try {
            const { details, credits, videos } = await getMovieDetails(this.props.route.params.id);
            const trailer = videos?.results.find((video) => video?.type === AppWords.trailer);
            this.setState({
                trailer,
                details,
                credits,
                loading: false,
            });
        } catch (error) {
            genericErrorHandling(error);
            this.setState({ loading: false });
        }
    };
}

export default MovieDetailsScreen;
