import { getItem, removeItem, setItem } from './asyncStorage';
import { getCurrentLanguage } from '../localization/i18n';
import {
    PAGE,
    QUERY,
    API_KEY,
    BASE_URL,
    LANGUAGE,
    StoreData,
    WITH_GENRE,
    IMAGE_BASE_URL,
    AsyncStorageKeys,
    CarouselItemCountLimit,
} from '../constants/constants';

export const stringFormat = (string, values) => {
    values = [].concat(values || []);
    for (const value of values) {
        string = string.replace('%S', value);
    }
    return string;
};

export const buildImageUrl = (string) => IMAGE_BASE_URL + string;

export const buildApiUrl = (string, id) =>
    BASE_URL + stringFormat(string, id) + API_KEY + LANGUAGE + getCurrentLanguage() + PAGE;

export const buildSearchUrl = (string, query) => {
    return buildApiUrl(string) + QUERY + query;
};

export const buildMoviesUrl = (string, id) =>
    buildApiUrl(string, id) + stringFormat(WITH_GENRE, id);

export const getUniqueElements = (arr, limitCount = true) => {
    const uniqueObjects = new Map();
    arr.forEach((item) => {
        if (uniqueObjects.has(item.id)) return;
        uniqueObjects.set(item.id, item);
    });
    return (
        (limitCount && Array.from(uniqueObjects.values()).slice(0, CarouselItemCountLimit)) ||
        Array.from(uniqueObjects.values())
    );
};

const mergeFavorites = async (data, user) => {
    const mergeUnique = (arr1, arr2) => {
        const merged = [...arr1, ...arr2];
        return merged.filter(
            (item, index, self) => index === self.findIndex((t) => t.id === item.id),
        );
    };
    const movie = mergeUnique(data.favorites.guest.movie, data.favorites[user.id].movie);
    const tvSeries = mergeUnique(data.favorites.guest.tvSeries, data.favorites[user.id].tvSeries);
    data.favorites.guest = { movie: [], tvSeries: [] };
    await setItem(AsyncStorageKeys.launchData, data);
    return { movie, tvSeries };
};

export const signOut = async (id) => {
    const data = await getItem(AsyncStorageKeys.launchData);
    const user = data?.users?.find((item) => item?.id === id);
    if (!user) return;
    user.isSignIn = false;
    setItem(AsyncStorageKeys.launchData, data);
};

export const getLaunchDetails = async (setLaunchDetails) => {
    const data = await getItem(AsyncStorageKeys.launchData);
    if (!data) {
        await setItem(AsyncStorageKeys.launchData, StoreData);
        setLaunchDetails(StoreData.users[0], StoreData.favorites?.guest);
        return { isFirstLaunch: true, isSignIn: false };
    }
    const user = data?.users?.find((item) => item?.isSignIn === true);
    if (!user) {
        setLaunchDetails(data.users[0], data.favorites.guest);
        return { isFirstLaunch: false, isSignIn: false };
    }
    const favorites = await mergeFavorites(data, user);
    setLaunchDetails(user, favorites);
    return { isFirstLaunch: false, isSignIn: true };
};

export const foundUser = async (inputEmail, inputPassword) => {
    const data = await getItem(AsyncStorageKeys.launchData);
    const user = data?.users?.find(
        (item) =>
            item?.email === inputEmail && (!inputPassword || item?.password === inputPassword),
    );
    if (!user) return false;
    const userIndex = data.users.findIndex((item) => item.email === inputEmail);
    const favorites = await mergeFavorites(data, user);
    data.favorites[user.id] = favorites;
    data.users[userIndex].isSignIn = true;
    data.favorites.guest = { movie: [], tvSeries: [] };
    await setItem(AsyncStorageKeys.launchData, data);
    return { user, favorites };
};

export const saveFavorites = async (userId, favorites) => {
    const data = await getItem(AsyncStorageKeys.launchData);
    data.favorites[userId] = favorites;
    setItem(AsyncStorageKeys.launchData, data);
};

export const changeFavoriteStatus = (isFavorite, userId, favorites, setFavorites, item, type) => {
    if (isFavorite) {
        const index = favorites[type].findIndex((movie) => item?.id === movie.id);
        favorites[type].splice(index, 1);
    } else {
        const newItem = {
            id: item?.id,
            name: item?.name,
            title: item?.title,
            img: item?.backdrop_path,
            rating: item?.vote_average,
            releaseDate: item?.release_date,
        };
        favorites[type].push(newItem);
    }
    setFavorites(favorites);
    saveFavorites(userId, favorites);
};

export const favoritesFirst = (data, isItemFavorite) => {
    const favorites = [];
    const nonFavorites = [];
    data.forEach((item) => {
        if (isItemFavorite(item.id)) {
            favorites.push(item);
            return;
        }
        nonFavorites.push(item);
    });
    return [...favorites, ...nonFavorites];
};

export const setAppSettings = async (setFavoriteViewType) => {
    const data = await getItem(AsyncStorageKeys.settings);
    if (!data) return;
    setFavoriteViewType(data?.favoriteIsRowView);
};

export const saveAppSettings = (settings) => {
    setItem(AsyncStorageKeys.settings, settings);
};
