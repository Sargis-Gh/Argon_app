/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform, SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      SplashScreen.hide();
    }
  }, []);
  return <SafeAreaView style={{flex: 1}}></SafeAreaView>;
}

export default App;
