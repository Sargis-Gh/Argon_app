import { createStore, combineReducers } from 'redux';
import appReducer from '../reducer/authReducer';
import navigationReducer from '../reducer/navigationReducer';

const rootReducer = combineReducers({
    navigation: navigationReducer,
    appReducer: appReducer
});

const store = createStore(rootReducer);

export default store;