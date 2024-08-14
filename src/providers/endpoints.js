import axios from 'axios';

import { stringFormat } from '../utils/utils';
import { Endpoints } from '../constants/constants';

export const getMovies = async () => {
    return await axios.get(Endpoints.getMovies);
};

export const getMovie = async (id) => {
    return await axios.get(stringFormat(Endpoints.getMovie, id));
};

export const getShows = async () => {
    const urls = [
        'https://api.tvmaze.com/shows/1/seasons',
        'https://api.tvmaze.com/shows/2/seasons',
        'https://api.tvmaze.com/shows/3/seasons',
        'https://api.tvmaze.com/shows/4/seasons',
        'https://api.tvmaze.com/shows/5/seasons',
        'https://api.tvmaze.com/shows/6/seasons',
        'https://api.tvmaze.com/shows/7/seasons',
    ];

    const requests = urls.map((url) => axios.get(url));
    const responses = await Promise.all(requests);
    const results = responses.map((response) => response.data);
    return results;
};

export const getActors = async () => {
    return await axios.get(Endpoints.actors);
};

export const getCreators = async () => {
    return await axios.get(Endpoints.creators);
};
