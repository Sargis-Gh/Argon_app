/**
 * @format
 */

import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import App from './App';
import store from './src/redux/store/store';
import ErrorBoundary from './ErrorBoundary';
import { name as appName } from './app.json';

import { navigationRef } from './src/navigation/navigation';

const RNRedux = () => (
    <ErrorBoundary>
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <App />
            </NavigationContainer>
        </Provider>
    </ErrorBoundary>
);

AppRegistry.registerComponent(appName, () => RNRedux);
