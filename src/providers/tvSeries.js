import axios from 'axios';

import { buildApiUrl } from '../utils/utils';
import { Endpoints, SeriesScreenDataTitles } from '../constants/constants';

export const getTVSerisData = async () => {
    const data = await Promise.all([
        axios.get(buildApiUrl(Endpoints.onTheAir)),
        axios.get(buildApiUrl(Endpoints.airingToDay)),
        axios.get(buildApiUrl(Endpoints.topRatedSeries)),
        axios.get(buildApiUrl(Endpoints.popularTVSeries)),
    ]);
    const result = data.map((item, index) => ({
        data: item?.data?.results,
        title: SeriesScreenDataTitles[index],
    }));
    return result;
};
