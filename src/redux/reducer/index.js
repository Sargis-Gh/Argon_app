import { combineReducers } from 'redux';

import userReducer from './authReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
    user: userReducer,
    settings: settingsReducer,
});
