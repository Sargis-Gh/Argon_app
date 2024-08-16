import axios from 'axios';

import { stringFormat } from '../utils/utils';
import { Endpoints } from '../constants/constants';

export const getMovies = () => {
    return axios.get(Endpoints.getMovies);
};

export const getMovie = (id) => {
    return axios.get(stringFormat(Endpoints.getMovie, id));
};

export const getSeasons = async () => {
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

export const getActors = () => {
    return axios.get(Endpoints.actors);
};

export const getCreators = () => {
    return axios.get(Endpoints.creators);
};
