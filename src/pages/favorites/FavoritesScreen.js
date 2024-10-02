import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { setFavorites } from '../../redux/action/userAction';
import CustomImage from '../../components/customImage/CustomImage';
import { setFavoriteViewType } from '../../redux/action/settingsAction';
import { saveAppSettings, getUniqueElements, changeFavoriteStatus } from '../../utils/utils';
import {
    Styles,
    PageName,
    CreditType,
    FavoritePageWords,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationNavigate } from '../../navigation/navigation';

class FavoritesScreen extends React.Component {
    state = {
        isMovie: true,
        display: false,
    };

    render() {
        const {
            settings: { favoriteIsRowView },
        } = this.props;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderSelectionContainer()}
                {(favoriteIsRowView && (
                    <GestureHandlerRootView style={styles.gestureContainer}>
                        {this.renderList()}
                    </GestureHandlerRootView>
                )) ||
                    this.renderList()}
                {this.renderMenu()}
            </View>
        );
    }

    renderHeader = () => {
        const { display } = this.state;
        return (
            <View style={styles.header}>
                <Text style={styles.title}>{t('favorites', LanguageLocalizationNSKey.common)}</Text>
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.4}
                    onPress={this.handleMenuButtonPress}>
                    {(display && <Icons.Close />) || <Icons.Apps />}
                </TouchableOpacity>
            </View>
        );
    };

    renderSelectionContainer = () => {
        const { isMovie } = this.state;
        return (
            <View style={styles.selectionContainer}>
                {this.renderSelectionButton(true, isMovie, FavoritePageWords.movie)}
                {this.renderSelectionButton(false, !isMovie, FavoritePageWords.series)}
            </View>
        );
    };

    renderSelectionButton = (isMovieButton, isMovie, text) => (
        <TouchableOpacity
            delayPressIn={100}
            activeOpacity={0.4}
            style={styles.selectionButtonContainer(isMovie)}
            onPress={() => this.handleSelectionButtonPress(isMovieButton)}>
            {(isMovieButton && (
                <Icons.Movie fill={(isMovie && Styles.appBackground) || Styles.white} />
            )) || <Icons.Series fill={(isMovie && Styles.appBackground) || Styles.white} />}
            <Text style={styles.selectionButtonText(isMovie)}>
                {t(text, LanguageLocalizationNSKey.onboarding)}
            </Text>
        </TouchableOpacity>
    );

    renderMenu = () => {
        const { display } = this.state;
        const {
            settings: { favoriteIsRowView },
        } = this.props;
        return (
            <View style={styles.menu(display, favoriteIsRowView)}>
                {this.renderMenuItem({
                    button: false,
                    text: FavoritePageWords.cardDisplayType,
                })}
                {this.renderMenuItem({ text: FavoritePageWords.row, checked: favoriteIsRowView })}
                {this.renderMenuItem({
                    checked: !favoriteIsRowView,
                    text: FavoritePageWords.column,
                })}
            </View>
        );
    };

    renderSwipeFavoriteItem = ({ item }) => (
        <Swipeable overshootRight={false} renderRightActions={() => this.renderRightActions(item)}>
            {this.renderFavoriteItem({ item })}
        </Swipeable>
    );

    renderRightActions = (item) => {
        const { isMovie } = this.state;
        const type = (isMovie && CreditType.movie) || CreditType.tvSeries;
        return (
            <TouchableOpacity
                style={styles.rightActionContainer}
                onPress={() => this.removeItem(item, type)}>
                <Text style={styles.deleteText}>
                    {t('remove', LanguageLocalizationNSKey.common)}
                </Text>
            </TouchableOpacity>
        );
    };

    renderFavoriteItem = ({ item }) => {
        const {
            settings: { favoriteIsRowView },
        } = this.props;
        return (
            <View style={styles.favoriteItem(favoriteIsRowView)}>
                <CustomImage source={item?.img} style={styles.image(favoriteIsRowView)} />
                <View style={styles.movieDetails(favoriteIsRowView)}>
                    <View style={styles.subDetails}>
                        {!!item?.rating && (
                            <View style={styles.rating}>
                                <Icons.StarHalf />
                                <Text style={styles.ratingText}>{item?.rating?.toFixed(1)}</Text>
                            </View>
                        )}
                        <Text style={styles.movieTitle}>
                            {(CreditType.movie && item?.title) || item?.name}
                        </Text>
                    </View>
                    {favoriteIsRowView && (
                        <View style={styles.genres}>
                            <Text>{item?.releaseDate}</Text>
                            {this.renderButton(FavoritePageWords.viewDetails, item?.id)}
                        </View>
                    )}
                </View>
                {!favoriteIsRowView && (
                    <View style={styles.buttonsContainer}>
                        {this.renderButton(FavoritePageWords.remove, item, true)}
                        {this.renderButton(FavoritePageWords.viewDetails, item)}
                    </View>
                )}
            </View>
        );
    };

    renderButton = (text, item, isRemove = false) => {
        const { isMovie } = this.state;
        const {
            settings: { favoriteIsRowView },
        } = this.props;
        const type = (isMovie && CreditType.movie) || CreditType.tvSeries;
        const onPress = (isRemove && this.removeItem) || this.openMovieDetails;
        return (
            <TouchableOpacity
                delayPressIn={100}
                activeOpacity={0.4}
                style={styles.button(favoriteIsRowView)}
                onPress={() => onPress(item, type)}>
                <Text style={styles.buttonText(isRemove)}>
                    {t(text, LanguageLocalizationNSKey.common)}
                </Text>
            </TouchableOpacity>
        );
    };

    renderList = () => {
        const { isMovie } = this.state;
        const {
            settings: { favoriteIsRowView },
            user: {
                favorites: { movie, tvSeries },
            },
        } = this.props;
        const data = (isMovie && movie) || tvSeries;
        const numColumns = (favoriteIsRowView && 1) || 2;
        const key = (favoriteIsRowView && FavoritePageWords.keyOne) || FavoritePageWords.keyTwo;
        const renderItem =
            (favoriteIsRowView && this.renderSwipeFavoriteItem) || this.renderFavoriteItem;
        return (
            <FlatList
                key={key}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                data={getUniqueElements(data, false)}
                keyExtractor={(item) => key + item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle(favoriteIsRowView)}
                renderItem={renderItem}
            />
        );
    };

    renderMenuItem = ({ text, button = true, checked }) => (
        <TouchableOpacity
            activeOpacity={1}
            disabled={!button}
            delayPressIn={100}
            style={styles.menuItem}
            onPress={() => this.changeCardDisplayType(checked)}>
            <Text style={styles.menuItemText}>{t(text, LanguageLocalizationNSKey.common)}</Text>
            {checked && <Icons.Check />}
        </TouchableOpacity>
    );

    handleMenuButtonPress = () => this.setState((prevState) => ({ display: !prevState.display }));

    handleSelectionButtonPress = (isMovieButton) => {
        const { isMovie } = this.state;
        if (isMovieButton === isMovie) return;
        this.setState({ isMovie: !isMovie });
    };

    changeCardDisplayType = (checked) => {
        const {
            setFavoriteViewType,
            settings: { favoriteIsRowView },
        } = this.props;
        if (checked) return;
        this.setState({ display: false });
        setFavoriteViewType(!favoriteIsRowView);
        saveAppSettings({ favoriteIsRowView: !favoriteIsRowView });
    };

    removeItem = (item, type) => {
        const {
            setFavorites,
            user: { email },
        } = this.props;
        changeFavoriteStatus(item, type, email, true, setFavorites);
    };

    openMovieDetails = ({ id }, type) => {
        const { navigation } = this.props;
        navigationNavigate(navigation, PageName.movieDetails, { id, type });
    };
}

const mapStateToProps = (state) => ({
    user: state.user,
    settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
    setFavorites: (updatedFavorites) => dispatch(setFavorites(updatedFavorites)),
    setFavoriteViewType: (updatedSettings) => dispatch(setFavoriteViewType(updatedSettings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
