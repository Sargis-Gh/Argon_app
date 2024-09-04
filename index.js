/**
 * @format
 */

import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import App from './App';
import store from './src/redux/store/store';
import ErrorBoundary from './ErrorBoundary';
import { name as appName } from './app.json';

const RNRedux = () => (
    <ErrorBoundary>
        <Provider store={store}>
            <App />
        </Provider>
    </ErrorBoundary>
);

AppRegistry.registerComponent(appName, () => RNRedux);
