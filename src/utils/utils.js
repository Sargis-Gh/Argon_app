import { Api_Key, BASE_URL, IMAGE_BASE_URL } from '../constants/constants';

export const stringFormat = (string, values) => {
    values = [].concat(values || []);
    for (const value of values) {
        string = string.replace('%S', value);
    }
    return string;
};

export const buildImageUrl = (string) => IMAGE_BASE_URL + string;

export const buildApiUrl = (string, id) => BASE_URL + stringFormat(string, id) + Api_Key;
