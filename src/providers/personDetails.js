import axios from 'axios';

import { buildApiUrl } from '../utils/utils';
import { Endpoints } from '../constants/constants';

export const getPersonDetails = async (id) => {
    const [person, tvCredits, movieCredits] = await Promise.all([
        axios.get(buildApiUrl(Endpoints.personDetails, id)),
        axios.get(buildApiUrl(Endpoints.personTVCredits, id)),
        axios.get(buildApiUrl(Endpoints.personMovieCredits, id)),
    ]);
    return { person: person.data, tvCredits: tvCredits.data, movieCredits: movieCredits.data };
    return new Promise((_, reject) => {
        setTimeout(() => reject('Error -----'), 2000);
    });
};
