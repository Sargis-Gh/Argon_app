import { AppWords, ReduxTypes } from '../../constants/constants';

const initialState = {
    details: {
        id: AppWords.guest,
        firstName: AppWords.guest,
    },
    favorites: {
        movie: [],
        tvSeries: [],
    },
};

export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ReduxTypes.setLaunchDetails:
            return { ...state, ...action.payload };
        case ReduxTypes.setFavorites:
            return { ...state, favorites: { ...action.payload } };
        case ReduxTypes.signOut:
            return initialState;
        default:
            return state;
    }
};
