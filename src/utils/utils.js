import { getItem, setItem } from './asyncStorage';
import { getCurrentLanguage } from '../localization/i18n';
import {
    PAGE,
    QUERY,
    Users,
    API_KEY,
    BASE_URL,
    LANGUAGE,
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

export const buildSearchUrl = (string, query) => buildApiUrl(string) + QUERY + query;

export const buildApiUrl = (string, id) =>
    BASE_URL + stringFormat(string, id) + API_KEY + LANGUAGE + getCurrentLanguage() + PAGE;

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

const mergeFavorites = (users, userKey) => {
    const mergeUnique = (arr1, arr2) => {
        return [...new Set([...arr1, ...arr2])];
    };
    const movie = mergeUnique(users?.guest?.favorites?.movie, users[userKey]?.favorites?.movie);
    const tvSeries = mergeUnique(
        users?.guest?.favorites?.tvSeries,
        users[userKey]?.favorites?.tvSeries,
    );
    users[userKey].favorites = { movie, tvSeries };
    users.guest.favorites = { movie: [], tvSeries: [] };
    setItem(AsyncStorageKeys.users, users);
};

export const signOut = async (email) => {
    const users = await getItem(AsyncStorageKeys.users);
    if (!users[email]) return;
    users[email].isSignIn = false;
    setItem(AsyncStorageKeys.users, users);
};

export const getLaunchDetails = async (setUser) => {
    const users = await getItem(AsyncStorageKeys.users);
    if (!users) {
        setUser(Users.guest);
        setItem(AsyncStorageKeys.users, Users);
        return { isFirstLaunch: true, isSignIn: false };
    }
    const user = Object.values(users)?.find((item) => item?.isSignIn === true);
    if (!user) {
        setUser(users.guest);
        return { isFirstLaunch: false, isSignIn: false };
    }
    mergeFavorites(users, user.email);
    setUser(user);
    return { isFirstLaunch: false, isSignIn: true };
};

export const foundUser = async (email, password) => {
    const users = await getItem(AsyncStorageKeys.users);
    const user = users[email];
    const isRegistered = users[email] && (!password || user?.password === password);
    if (!isRegistered) return false;
    user.isSignIn = true;
    mergeFavorites(users, email);
    return user;
};

export const changeFavoriteStatus = async (item, type, email, isFavorite, setFavorites) => {
    console.log(item);
    const users = await getItem(AsyncStorageKeys.users);
    const favorites = users[email]?.favorites;
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
    console.log(favorites);
    setFavorites(favorites);
    setItem(AsyncStorageKeys.users, users);
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
