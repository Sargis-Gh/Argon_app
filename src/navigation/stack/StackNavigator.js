import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PageName} from '../../constants/constants';
import SignScreen from '../../pages/sign/SignScreen';

import {Text, SafeAreaView, View} from 'react-native';
import Onboarding from '../onboard/Onboarding';
import Tabs from '../tabs/tabs';
import DrawerNavigator from '../drawer/Drawer';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  //   const isFirstOpen = useSelector(state => state.isFirstOpen.isFirstOpen);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const checkFirstTimeOpen = async () => {
  //       try {
  //         const storedIsFirstOpen = await AsyncStorage.getItem(
  //           AppWords.asyncStoreFirstOpenKey,
  //         );
  //         if (storedIsFirstOpen !== null) {
  //           dispatch(setIsFirstOpen(JSON.parse(storedIsFirstOpen)));
  //         }
  //       } catch (e) {
  //         console.error('Failed to load isFirstOpen flag from AsyncStorage', e);
  //       }
  //     };

  //     checkFirstTimeOpen();
  //   }, [dispatch]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={PageName.tabs}>
      <Stack.Screen name={PageName.onBoarding} component={Onboarding} />
      <Stack.Screen name={PageName.sign} component={SignScreen} />
      <Stack.Screen name={PageName.tabs} component={DrawerNavigator}/>
      {/* <Stack.Screen name={PageName.loading} component={LoadingScreen} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigation;
