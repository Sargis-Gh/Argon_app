import axios from 'axios';

import { AppURL } from '../constants/constants';

export const getUniversities = async () => {
    return await axios.get(AppURL.universities);
};
