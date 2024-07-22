/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import store from './src/redux/store/store'


import 'react-native-gesture-handler'
import AppNavigator from './src/navigation/navigator'
import { detectAndInitializeLanguage } from './src/localization/i18n'

function App() {

    useEffect(() => {
        detectAndInitializeLanguage();
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            SplashScreen.hide()
        }
    }, [])
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    )
}

export default App
