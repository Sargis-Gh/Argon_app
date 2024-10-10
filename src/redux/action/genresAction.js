import { ReduxTypes } from '../../constants/constants';

export const setGenres = (genres) => ({
    payload: genres,
    type: ReduxTypes.setGenres,
});
