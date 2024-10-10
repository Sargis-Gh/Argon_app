import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import styles from './style';
import { Icons } from '../../constants/Icons';
import { setGenres } from '../../redux/action/genresAction';
import { getItem, setItem } from '../../utils/asyncStorage';
import ResultItem from './components/resultItem/ResultItem';
import { setFavorites } from '../../redux/action/userAction';
import MovieItem from '../../components/movieItem/MovieItem';
import { getCurrentLanguage, t } from '../../localization/i18n';
import { genericErrorHandling } from '../../utils/errorHandlers';
import { favoritesFirst, isItemFavorite } from '../../utils/utils';
import { getGenres, getMovies, searchMovies } from '../../providers/movies';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    Styles,
    AppWords,
    CreditType,
    ReturnKeyType,
    AsyncStorageKeys,
    FavoritePageWords,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

class MoviesScreen extends React.Component {
    state = {
        data: [],
        query: '',
        loading: true,
        searchData: [],
        notFound: false,
        wrongData: false,
        currentGenreItem: '',
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener(AppWords.focus, this.initData);
    }

    componentWillUnmount() {
        this.focusListener();
    }

    render() {
        const { loading, wrongData } = this.state;
        if (loading) return <CustomActivityIndicator />;
        if (wrongData)
            return (
                <WrongDataScreen navigationBar={false} clickRetryButton={this.clickRetryButton} />
            );
        const { searchData, notFound } = this.state;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {!searchData.length && this.renderGenresList()}
                {(searchData.length && this.renderResultContainer()) ||
                    (notFound && this.renderNotFound()) ||
                    this.renderMovies()}
            </View>
        );
    }

    renderHeader = () => {
        const { query } = this.state;
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{t('title', LanguageLocalizationNSKey.movies)}</Text>
                <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={this.initSearchData}>
                        <Icons.Search />
                    </TouchableOpacity>
                    <TextInput
                        value={query}
                        style={styles.inputText}
                        placeholderTextColor={Styles.grey}
                        returnKeyType={ReturnKeyType.search}
                        onSubmitEditing={this.initSearchData}
                        placeholder={t('texts.sherlockHolmes', LanguageLocalizationNSKey.movies)}
                        onChangeText={(text) => this.setState({ query: text })}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            this.setState({ searchData: [], query: '', notFound: false })
                        }>
                        <Icons.Close />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    renderGenresList = () => {
        const {
            genres: { data },
        } = this.props;
        return (
            <FlatList
                horizontal
                data={data}
                style={styles.genresList}
                key={FavoritePageWords.keyTwo}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View style={styles.lastElement} />}
                renderItem={this.renderGenreItem}
            />
        );
    };

    renderGenreItem = ({ item }) => {
        const { currentGenreItem } = this.state;
        const isCurrent = currentGenreItem === item.id;
        return (
            <TouchableOpacity
                delayPressIn={100}
                activeOpacity={0.4}
                style={styles.genreItem}
                onPress={() => this.changeGenre(item.id)}>
                <Text style={styles.genreItemText(isCurrent)}>{item.name}</Text>
                {isCurrent && <View style={styles.genreItemLine} />}
            </TouchableOpacity>
        );
    };

    renderMovies = () => {
        const { data } = this.state;
        const {
            user: {
                favorites: { movie },
            },
        } = this.props;
        const sortedData = favoritesFirst(data, movie);
        return (
            <FlatList
                numColumns={2}
                data={sortedData}
                style={styles.moviesList}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={styles.footer} />}
                renderItem={this.renderMovieItem}
            />
        );
    };

    renderMovieItem = ({ item }) => {
        const {
            navigation,
            setFavorites,
            user: {
                email,
                favorites: { movie },
            },
        } = this.props;
        const isFavorite = isItemFavorite(movie, item.id);
        return (
            <MovieItem
                item={item}
                email={email}
                navigation={navigation}
                type={CreditType.movie}
                isFavorite={isFavorite}
                setFavorites={setFavorites}
            />
        );
    };

    renderResultContainer = () => {
        const { searchData } = this.state;
        return (
            <FlatList
                data={searchData}
                key={FavoritePageWords.keyOne}
                style={styles.resultContainer}
                keyExtractor={(item) => item?.id}
                renderItem={this.renderResultItem}
            />
        );
    };

    renderResultItem = ({ item }) => {
        const {
            navigation,
            setFavorites,
            user: {
                email,
                favorites: { movie },
            },
        } = this.props;
        const isFavorite = isItemFavorite(movie, item.id);
        return (
            <ResultItem
                item={item}
                email={email}
                navigation={navigation}
                type={CreditType.movie}
                isFavorite={isFavorite}
                setFavorites={setFavorites}
            />
        );
    };

    renderNotFound = () => (
        <View style={styles.notFoundContainer}>
            <Text style={styles.resultItemText}>
                {t('texts.notFound', LanguageLocalizationNSKey.movies)}
            </Text>
            <Icons.NotFound />
        </View>
    );

    changeGenre = (item) => {
        const { currentGenreItem } = this.state;
        if (currentGenreItem === item) return;
        this.setState({ currentGenreItem: item, loading: true });
        this.initData();
    };

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    initSearchData = async () => {
        const { query } = this.state;
        const {
            user: {
                favorites: { movie },
            },
        } = this.props;
        if (!query) return;
        try {
            const searchData = await searchMovies(query);
            this.setState({
                notFound: !searchData.length,
                searchData: favoritesFirst(searchData, movie),
            });
        } catch (error) {
            this.setState({ wrongData: true });
            genericErrorHandling(error);
        }
    };

    getGenreItem = async () => {
        const currentLanguage = getCurrentLanguage();
        const {
            setGenres,
            genres: { data, language },
        } = this.props;
        if (data?.length && currentLanguage === language) return data[0]?.id;
        const storedGenres = await getItem(AsyncStorageKeys.genres);
        if (storedGenres && storedGenres?.language === currentLanguage) {
            setGenres({ data: storedGenres?.data, language: currentLanguage });
            return storedGenres?.data[0]?.id;
        }
        try {
            const data = await getGenres();
            setGenres({ data, language: currentLanguage });
            setItem(AsyncStorageKeys.genres, { data, language: currentLanguage });
            return data[0]?.id;
        } catch (error) {
            genericErrorHandling(error);
        }
    };

    initData = async () => {
        try {
            const genreItem = await this.getGenreItem();
            const { currentGenreItem } = this.state;
            const item = currentGenreItem || genreItem;
            const data = await getMovies(item);
            this.setState({
                data,
                loading: false,
                wrongData: false,
                currentGenreItem: item,
            });
        } catch (error) {
            this.setState({ wrongData: true, loading: false });
            genericErrorHandling(error);
        }
    };
}

const mapStateToProps = (state) => ({
    user: state.user,
    genres: state.genres,
});

const mapDispatchToProps = (dispatch) => ({
    setGenres: (updatedGenres) => dispatch(setGenres(updatedGenres)),
    setFavorites: (updatedFavorites) => dispatch(setFavorites(updatedFavorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesScreen);
