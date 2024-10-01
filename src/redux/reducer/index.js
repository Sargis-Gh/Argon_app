import { combineReducers } from 'redux';

import userReducer from './userReducer';
import genresReducer from './genresReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
    user: userReducer,
    genres: genresReducer,
    settings: settingsReducer,
});
