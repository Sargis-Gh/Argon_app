import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import styles from './style';
import { PageName } from '../../constants/constants';
import SignInScreen from '../../pages/signIn/SignInScreen';
import Onboarding from '../../pages/onboarding/OnboardingScreen';
import BottomTabNavigator from '../bottomNavigationBar/BottomNavigationBar';
import MovieDetailsScreen from '../../pages/movieDetails/MovieDetailsScreen';
import PersonDetailsScreen from '../../pages/personDetails/PersonDetailsScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: styles.cardStyle,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
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
                name={PageName.movieDetails}
                component={MovieDetailsScreen}
                options={({ navigation }) => ({
                    movieDetailsScreenProps: { navigation },
                })}
            />
            <Stack.Screen
                name={PageName.personDetails}
                component={PersonDetailsScreen}
                options={({ navigation }) => ({
                    personDetailsScreenProps: { navigation },
                })}
            />
        </Stack.Navigator>
    );
};

export default StackNavigation;
