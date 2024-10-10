import axios from 'axios';

import { buildApiUrl } from '../utils/utils';
import { CreditType, Endpoints } from '../constants/constants';

const getDetails = async (endpoints, id) => {
    const [videos, details, credits] = await Promise.all([
        axios.get(buildApiUrl(endpoints.videos, id)),
        axios.get(buildApiUrl(endpoints.details, id)),
        axios.get(buildApiUrl(endpoints.credits, id)),
    ]);

    return { details: details.data, credits: credits.data, videos: videos.data };
};

export const getData = async (id, type) => {
    const endpoints = (CreditType.movie === type && {
        videos: Endpoints.movieVideos,
        details: Endpoints.movieDetails,
        credits: Endpoints.movieCredits,
    }) || {
        videos: Endpoints.tvVideos,
        credits: Endpoints.tvCredits,
        details: Endpoints.tvSeriesDetails,
    };

    return getDetails(endpoints, id);
};

export const getSimilarMovies = async (id, isMovie) => {
    const endpoint = (isMovie && Endpoints.similarMovies) || Endpoints.similarTVSeries;
    const response = await axios.get(buildApiUrl(endpoint, id));
    return response?.data?.results;
};
