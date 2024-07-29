/**
 * @format
 */

import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import App from './App';
import { name as appName } from './app.json';

import store from './src/redux/store/store'
import { navigationRef } from './src/navigation/navigation';

const RNRedux = () => (
    <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
            <App />
        </NavigationContainer>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
