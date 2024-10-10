import { ReduxTypes } from '../../constants/constants';

export const setFavoriteViewType = (settings) => ({
    payload: settings,
    type: ReduxTypes.setFavoriteViewType,
});
