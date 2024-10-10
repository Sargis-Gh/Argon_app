import { AppWords, ReduxTypes } from '../../constants/constants';

const initialState = {
    email: AppWords.guest,
    firstName: AppWords.guest,
    favorites: { movie: [], tvSeries: [] },
};

export default userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ReduxTypes.setUser:
            return { ...state, ...action.payload };
        case ReduxTypes.setFavorites:
            return { ...state, favorites: { ...action.payload } };
        case ReduxTypes.signOut:
            return initialState;
        default:
            return state;
    }
};
