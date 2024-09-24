import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { favoritesFirst } from '../../utils/utils';
import ResultItem from './components/resultItem/ResultItem';
import { setFavorites } from '../../redux/action/authAction';
import MovieItem from '../../components/movieItem/MovieItem';
import { getMovies, searchMovies } from '../../providers/movies';
import { genericErrorHandling } from '../../utils/errorHandlers';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    Styles,
    AppWords,
    CreditType,
    ReturnKeyType,
    MoviesPageWords,
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
        currentGenreItem: MoviesPageWords.movieGenres[0].id,
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

    renderGenresList = () => (
        <FlatList
            horizontal
            style={styles.genresList}
            key={FavoritePageWords.keyTwo}
            keyExtractor={(item) => item.id}
            data={MoviesPageWords.movieGenres}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<View style={styles.lastElement} />}
            renderItem={this.renderGenreItem}
        />
    );

    renderGenreItem = ({ item }) => {
        const { currentGenreItem } = this.state;
        const isCurrent = currentGenreItem === item.id;
        return (
            <TouchableOpacity
                delayPressIn={100}
                activeOpacity={0.8}
                style={styles.genreItem}
                onPress={() => this.changeGenre(item.id)}>
                <Text style={styles.genreItemText(isCurrent)}>
                    {t(`texts.${item.name}`, LanguageLocalizationNSKey.movies)}
                </Text>
                {isCurrent && <View style={styles.genreItemLine} />}
            </TouchableOpacity>
        );
    };

    renderMovies = () => {
        const { data } = this.state;
        const sortedData = favoritesFirst(data, this.isItemFavorite);
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
                favorites,
                details: { id },
            },
        } = this.props;
        const isFavorite = this.isItemFavorite(item.id);
        return (
            <MovieItem
                item={item}
                userId={id}
                favorites={favorites}
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
        const isFavorite = this.isItemFavorite(item.id);
        const {
            navigation,
            setFavorites,
            user: {
                favorites,
                details: { id },
            },
        } = this.props;
        return (
            <ResultItem
                item={item}
                userId={id}
                favorites={favorites}
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

    isItemFavorite = (id) => {
        const {
            user: { favorites },
        } = this.props;
        return !!favorites.movie.find((item) => id === item.id);
    };

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
        if (!query) return;
        try {
            const searchData = await searchMovies(query);
            this.setState({
                notFound: !searchData.length,
                searchData: favoritesFirst(searchData, this.isItemFavorite),
            });
        } catch (error) {
            this.setState({ wrongData: true });
            genericErrorHandling(error);
        }
    };

    initData = async () => {
        const { currentGenreItem } = this.state;
        try {
            const data = await getMovies(currentGenreItem);
            this.setState({
                data,
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

export default connect(mapStateToProps, mapDispatchToProps)(MoviesScreen);
