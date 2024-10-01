import { ReduxTypes } from '../../constants/constants';

export const setUser = (user) => ({
    payload: user,
    type: ReduxTypes.setUser,
});

export const performSignOut = () => ({
    type: ReduxTypes.signOut,
});

export const setFavorites = (favorites) => ({
    payload: favorites,
    type: ReduxTypes.setFavorites,
});
