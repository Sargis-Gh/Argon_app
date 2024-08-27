import axios from 'axios';

import { buildApiUrl } from '../utils/utils';
import { Endpoints } from '../constants/constants';

export const getMovieDetails = async (id) => {
    const [details, credits] = await Promise.all([
        axios.get(buildApiUrl(Endpoints.movieDetails, id)),
        axios.get(buildApiUrl(Endpoints.movieCredits, id)),
    ]);
    return { details: details.data, credits: credits.data };
};
