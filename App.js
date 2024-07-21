/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';

import './src/localization/i18n';
import 'react-native-gesture-handler';
import MyStack from './src/navigation/stack/StackNavigator';

function App() {
  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;
