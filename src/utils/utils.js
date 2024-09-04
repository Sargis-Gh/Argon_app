import { getItem, setItem } from './asyncStorage';
import { getCurrentLanguage } from '../localization/i18n';
import {
    PAGE,
    API_KEY,
    BASE_URL,
    LANGUAGE,
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
    BASE_URL + stringFormat(string, id) + LANGUAGE + getCurrentLanguage() + PAGE + API_KEY;

export const getIsFirstLaunch = async () => {
    const hasLaunched = JSON.parse(await getItem(AsyncStorageKeys.isFirstLaunch));
    if (!hasLaunched) {
        setItem(AsyncStorageKeys.isFirstLaunch, JSON.stringify(false));
        return false;
    }
    return true;
};

export const getUniqueElements = (arr) => {
    const uniqueObjects = new Map();
    arr.forEach((item) => {
        if (!uniqueObjects.has(item.id)) {
            uniqueObjects.set(item.id, item);
        }
    });
    return Array.from(uniqueObjects.values()).slice(0, CarouselItemCountLimit);
};
