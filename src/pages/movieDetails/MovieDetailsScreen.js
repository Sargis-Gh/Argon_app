import React from 'react';
import FastImage from 'react-native-fast-image';
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
    PageName,
    movieGenres,
    KnownForDepartment,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

class MovieDetailsScreen extends React.Component {
    state = {
        details: {},
        credits: {},
        loading: true,
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        const { navigation } = this.props;
        const { details, credits, loading } = this.state;
        if (loading) return <CustomActivityIndicator />;
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {this.renderHeader(details, navigation)}
                {this.renderAboutMovie(details, credits, navigation)}
            </ScrollView>
        );
    }

    renderHeader = ({ poster_path }, navigation) => (
        <View>
            {!!poster_path && (
                <FastImage
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.stretch}
                    source={{ uri: buildImageUrl(poster_path) }}
                />
            )}
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backIcon}
                onPress={() => {
                    navigationNavigate(navigation, PageName.home);
                }}>
                <CustomBlurView />
                <Icons.Left />
            </TouchableOpacity>
        </View>
    );

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
                        {genres.map((genre) => this.renderGenreItem(genre.id))}
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

    renderGenreItem = (id) => (
        <View key={genre} style={styles.genreItem}>
            <Text style={styles.text}>
                {(genre = movieGenres.find((genre) => genre?.id === id).name)}
            </Text>
        </View>
    );

    initData = async () => {
        try {
            const { details, credits } = await getMovieDetails(this.props.route.params.id);
            this.setState({
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
