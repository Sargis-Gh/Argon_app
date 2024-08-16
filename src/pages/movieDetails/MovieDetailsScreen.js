import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { removeTags } from '../../utils/utils';
import { getMovie } from '../../providers/endpoints';
import Divider from '../../components/divider/Divider';
import { genericErrorHandling } from '../../utils/errorHandlers';
import { LanguageLocalizationNSKey, PageName } from '../../constants/constants';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';

import { navigationNavigate } from '../../navigation/navigation';

class MovieDetailsScreen extends React.Component {
    state = {
        data: {},
        loading: true,
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        const { data, loading } = this.state;
        if (loading) return <CustomActivityIndicator />;
        return (
            <ScrollView style={styles.container}>
                {this.renderHeader(data?.image?.original)}
                {this.renderAboutMovie(data)}
            </ScrollView>
        );
    }

    renderHeader = (image) => {
        const { navigation } = this.props;
        return (
            <View>
                {image && (
                    <FastImage
                        style={styles.image}
                        source={{ uri: image }}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                )}
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => {
                        console.log('Click');
                        navigationNavigate(navigation, PageName.series);
                    }}>
                    <Icons.Left />
                </TouchableOpacity>
            </View>
        );
    };

    renderAboutMovie = ({ name, averageRuntime, ended, summary, rating, genres }) => (
        <View style={styles.aboutMovieContainer}>
            <Text style={styles.movieName}>{name}</Text>
            <View style={styles.minutesAndRatings}>
                <Icons.Schedule />
                <Text style={styles.text}>
                    {averageRuntime} {t('minutes', LanguageLocalizationNSKey.common)}
                </Text>
                <Icons.Star />
                <Text style={styles.text}>{rating?.average}</Text>
            </View>
            <Divider />
            <View style={styles.releaseGenreContainer}>
                <View style={styles.releaseContainer}>
                    <Text style={styles.releaseDate}>
                        {t('releaseDate', LanguageLocalizationNSKey.common)}
                    </Text>
                    <Text style={styles.text}>{ended}</Text>
                </View>
                <View style={styles.genresContainer}>
                    <Text style={styles.releaseDate}>
                        {t('genre', LanguageLocalizationNSKey.common)}
                    </Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.genreItemsContainer}>
                        {genres?.map((genre) => this.renderGenreItem(genre))}
                    </ScrollView>
                </View>
            </View>
            <Divider />
            <View style={styles.description}>
                <Text style={styles.releaseDate}>
                    {t('synopsis', LanguageLocalizationNSKey.common)}
                </Text>
                <Text style={styles.text}>{removeTags(summary)}</Text>
            </View>
        </View>
    );

    renderGenreItem = (genre) => (
        <View key={genre} style={styles.genreItem}>
            <Text style={styles.text}>{genre}</Text>
        </View>
    );

    initData = async () => {
        try {
            const { data } = await getMovie(this.props.route.params.id);
            this.setState({
                data,
                loading: false,
            });
        } catch (error) {
            genericErrorHandling(error);
            this.setState({ loading: false });
        }
    };
}

export default MovieDetailsScreen;
