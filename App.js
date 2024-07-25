/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MyStack from './src/navigation/stack/StackNavigator'
import { detectAndInitializeLanguage } from './src/localization/i18n';

class App extends React.Component {
    async componentDidMount() {
        await detectAndInitializeLanguage()
        SplashScreen.hide()
    } 

    render() { 
        return (
            <GestureHandlerRootView>
                <MyStack />
            </GestureHandlerRootView>
        )
    }
}

export default App
