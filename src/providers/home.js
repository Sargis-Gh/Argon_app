import axios from 'axios';

import { buildApiUrl } from '../utils/utils';
import { Endpoints, HomeScreenDataTitles } from '../constants/constants';

export const getHomeData = async () => {
    const data = await Promise.all([
        axios.get(buildApiUrl(Endpoints.topRated)),
        axios.get(buildApiUrl(Endpoints.nowPlaying)),
        axios.get(buildApiUrl(Endpoints.popularMovies)),
        axios.get(buildApiUrl(Endpoints.upcomingMovies)),
    ]);
    return data.map((el, index) => ({ data: el.data.results, title: HomeScreenDataTitles[index] }));

    return new Promise((_, reject) => {
        setTimeout(() => reject('Error -----'), 3000);
    });
};
