import { ReduxTypes } from '../../constants/constants';

const initialState = {
    data: {},
    language: '',
};

export default genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case ReduxTypes.setGenres:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
