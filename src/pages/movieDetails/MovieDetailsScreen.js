import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { removeTags } from '../../utils/utils';
import { getMovie } from '../../providers/endpoints';
import { LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';

class MovieDetailsScreen extends React.Component {
    state = {
        data: [],
        loading: true,
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        if (this.state.loading) return <CustomActivityIndicator />;
        const { data } = this.state;
        return (
            <ScrollView style={styles.container}>
                {this.renderHeader(data.image.original)}
                {this.renderAboutMovie(data)}
            </ScrollView>
        );
    }

    renderHeader = (image) => {
        const width = Dimensions.get(Styles.window).width;
        return (
            <View>
                <Image source={{ uri: image }} style={[{ width: width }, styles.image]} />
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => {
                        this.props.navigation.navigate(PageName.series);
                    }}>
                    <Icons.Left />
                </TouchableOpacity>
            </View>
        );
    };

    renderAboutMovie = (data) => (
        <View style={styles.aboutMovieContainer}>
            <Text style={styles.movieName}>{data.name}</Text>
            <View style={styles.minutesAndRatings}>
                <Icons.Schedule />
                <Text style={styles.text}>
                    {data.averageRuntime} {t('minutes', LanguageLocalizationNSKey.common)}
                </Text>
                <Icons.Star />
                <Text style={styles.text}>{data.rating.average}</Text>
            </View>
            {this.renderDivider()}
            <View style={styles.releaseGenreContainer}>
                <View style={styles.releaseContainer}>
                    <Text style={styles.releaseDate}>
                        {t('releaseDate', LanguageLocalizationNSKey.common)}
                    </Text>
                    <Text style={styles.text}>{data.ended}</Text>
                </View>
                <View style={styles.genresContainer}>
                    <Text style={styles.releaseDate}>
                        {t('genre', LanguageLocalizationNSKey.common)}
                    </Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.genreItemsContainer}>
                        {data.genres.map((genre) => this.renderGenreItem(genre))}
                    </ScrollView>
                </View>
            </View>
            {this.renderDivider()}
            <View style={styles.description}>
                <Text style={styles.releaseDate}>
                    {t('synopsis', LanguageLocalizationNSKey.common)}
                </Text>
                <Text style={styles.text}>{removeTags(data.summary)}</Text>
            </View>
        </View>
    );

    renderDivider = () => <View style={styles.divider}></View>;

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
            console.log('Error: ', error);
            this.setState({ loading: false });
        }
    };
}

export default MovieDetailsScreen;
