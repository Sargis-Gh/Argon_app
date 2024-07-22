import React, { useEffect, useState } from 'react'
// import {useDispatch, useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack'
import { PageName } from '../../constants/constants'
import SignScreen from '../../pages/sign/SignScreen'

import { Text, SafeAreaView, View } from 'react-native'
// import Tabs from '../tabs/tabs'
import DrawerNavigator from '../drawer/Drawer'
import IntroSlider from '../../pages/onboarding/components/OnboardingScreen'
import BottomTabAuthNavigator from '../tabs/tabs'

const Stack = createStackNavigator()

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
            initialRouteName={PageName.home}>
            <Stack.Screen name={PageName.intro} component={IntroSlider} />
            <Stack.Screen name={PageName.sign} component={SignScreen} />
            {/* <Stack.Screen name={PageName.drawer} component={DrawerNavigator} /> */}
            <Stack.Screen
                name={'Home'}
                component={BottomTabAuthNavigator}
                // options={{ animation: Animations.none }}
            />
            {/* <Stack.Screen name={PageName.loading} component={LoadingScreen} /> */}
        </Stack.Navigator>
    )
}

export default StackNavigation
