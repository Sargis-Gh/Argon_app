import axios from 'axios';

import { AppURL } from '../constants/constants';

export const getUniversities = async () => {
    try {
        return await axios.get(AppURL.universities);
    } catch (error) {
        throw error;
    }
};
