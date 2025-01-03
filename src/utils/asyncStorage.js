import AsyncStorage from '@react-native-async-storage/async-storage';

import { errorHandling } from './errorHandlers';

/*
 * Function to save data to AsyncStorage
 */
export const setItem = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        errorHandling(e);
    }
};

/*
 * Function to get data from AsyncStorage
 */
export const getItem = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        errorHandling(e);
    }
};

/*
 * Function to remove data from AsyncStorage
 */
export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        errorHandling(e);
    }
};
