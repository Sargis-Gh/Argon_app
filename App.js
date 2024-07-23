/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Provider } from 'react-redux'
import { Platform } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

import 'react-native-gesture-handler'
import store from './src/redux/store/store'
import AppNavigator from './src/navigation/navigator'
import { PlatformName } from './src/constants/constants'
import { detectAndInitializeLanguage } from './src/localization/i18n'

function App() {
    useEffect(() => {
        detectAndInitializeLanguage()
        if (Platform.OS === PlatformName.android || Platform.OS === PlatformName) {
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
