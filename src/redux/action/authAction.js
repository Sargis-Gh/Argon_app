import { ReduxTypes } from '../../constants/constants';

export const setLaunchDetails = (details, favorites) => ({
    payload: { details, favorites },
    type: ReduxTypes.setLaunchDetails,
});

export const performSignOut = () => ({
    type: ReduxTypes.signOut,
});

export const setFavorites = (favorites) => ({
    payload: favorites,
    type: ReduxTypes.setFavorites,
});
