import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PageName } from '../../constants/constants';
import SignInScreen from '../../pages/signIn/SignInScreen';
import Onboarding from '../../pages/onboarding/OnboardingScreen';
import BottomTabNavigator from '../bottomNavigationBar/BottomNavigationBar';
import MovieDetailsScreen from '../../pages/movieDetails/MovieDetailsScreen';

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
                    gestureEnabled: false,
                    signScreenProps: { navigation },
                })}
            />
            <Stack.Screen
                name={PageName.tabs}
                component={BottomTabNavigator}
                options={({ navigation }) => ({
                    gestureEnabled: false,
                    bottomTabNavigatorProps: { navigation },
                })}
            />
            <Stack.Screen
                name={PageName.details}
                component={MovieDetailsScreen}
                options={({ navigation }) => ({
                    gestureEnabled: false,
                    movieDetailsScreenProps: { navigation },
                })}
            />
            {/* Loading Screen */}
        </Stack.Navigator>
    );
};

export default StackNavigation;
