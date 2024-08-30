import axios from 'axios';

import { buildApiUrl } from '../utils/utils';
import { Endpoints } from '../constants/constants';

export const getMovieDetails = async (id) => {
    const [details, credits, videos] = await Promise.all([
        axios.get(buildApiUrl(Endpoints.movieDetails, id)),
        axios.get(buildApiUrl(Endpoints.movieCredits, id)),
        axios.get(buildApiUrl(Endpoints.movieVideos, id)),
    ]);
    return { details: details.data, credits: credits.data, videos: videos.data };  
    return new Promise((_, reject) => {
        setTimeout(() => reject('Error -----'), 3000);
    });
};

export const getTVShowsDetails = async (id) => {
    const [details, credits, videos] = await Promise.all([
        axios.get(buildApiUrl(Endpoints.tvShowsDetails, id)),
        axios.get(buildApiUrl(Endpoints.tvCredits, id)),
        axios.get(buildApiUrl(Endpoints.tvVideos, id)),
    ]);
    return { details: details.data, credits: credits.data, videos: videos.data };
};
