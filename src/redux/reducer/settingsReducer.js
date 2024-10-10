import { ReduxTypes } from '../../constants/constants';

const initialState = {
    favoriteIsRowView: true,
};

export default settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ReduxTypes.setFavoriteViewType:
            return { ...state, favoriteIsRowView: action.payload };
        default:
            return state;
    }
};
