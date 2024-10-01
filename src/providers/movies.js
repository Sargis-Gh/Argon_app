import axios from 'axios';

import { Endpoints } from '../constants/constants';
import { buildApiUrl, buildMoviesUrl, buildSearchUrl } from '../utils/utils';

export const getMovies = async (id) => {
    const response = await axios.get(buildMoviesUrl(Endpoints.movies, id));
    return response?.data?.results;
};

export const searchMovies = async (query) => {
    const response = await axios.get(buildSearchUrl(Endpoints.searchMovie, query));
    return response?.data?.results;
};

export const getGenres = async () => {
    const response = await axios.get(buildApiUrl(Endpoints.genres));
    return response?.data?.genres;
};
