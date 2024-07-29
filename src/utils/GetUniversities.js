import axios, { isCancel, AxiosError } from 'axios';
import { AppURL } from '../constants/constants';

export const getUniversitiesFromApi = async () => {
    try {
        const response = await axios.get(AppURL.universities);
        return response.data;
    } catch (error) {
        console.log("1111",error);
        throw error;
    }
}