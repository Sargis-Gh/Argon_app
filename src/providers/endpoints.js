import axios from 'axios';

import { stringFormat } from '../utils/utils';
import { Endpoints } from '../constants/constants';

export const getMovies = () => {
    return axios.get(Endpoints.getMovies);
};

export const getMovie = (id) => {
    return axios.get(stringFormat(Endpoints.getMovie, id));
};

export const getActors = () => {
    return axios.get(Endpoints.actors);
};

export const getCreators = () => {
    return axios.get(Endpoints.creators);
};
