import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PageName } from '../../constants/constants';
import SignInScreen from '../../pages/signIn/SignInScreen';
import Onboarding from '../../pages/onboarding/OnboardingScreen';
import MovieDetailsScreen from '../../pages/movieDetails/MovieDetailsScreen';
import BottomTabNavigator from '../bottomNavigationBar/BottomNavigationBar';

const Stack = createStackNavigator();

/*
 * Add loading screen
 */
const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={PageName.onboarding}>
            <Stack.Screen
                name={PageName.onboarding}
                component={Onboarding}
                options={({ navigation }) => ({
                    onboardingScreenProps: { navigation },
                })}
            />
            <Stack.Screen
                name={PageName.sign}
                component={SignInScreen}
                options={({ navigation }) => ({
                    signScreenProps: { navigation },
                    gestureEnabled: false,
                })}
            />
            <Stack.Screen
                name={PageName.tabs}
                component={BottomTabNavigator}
                options={({ navigation }) => ({
                    bottomTabNavigatorProps: { navigation },
                    gestureEnabled: false,
                })}
            />
            <Stack.Screen
                name={PageName.details}
                component={MovieDetailsScreen}
                options={({ navigation }) => ({
                    movieDetailsScreenProps: { navigation },
                    gestureEnabled: false,
                })}
            />
            {/* Loading Screen */}
        </Stack.Navigator>
    );
};

export default StackNavigation;
