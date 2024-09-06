import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PageName } from '../../constants/constants';
import SignInScreen from '../../pages/signIn/SignInScreen';
import Onboarding from '../../pages/onboarding/OnboardingScreen';
import BottomTabNavigator from '../bottomNavigationBar/BottomNavigationBar';
import MovieDetailsScreen from '../../pages/movieDetails/MovieDetailsScreen';
import PersonDetailsScreen from '../../pages/personDetails/PersonDetailsScreen';

const Stack = createStackNavigator();

const StackNavigation = (props) => {
    const { initialRouteName } = props;
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={initialRouteName}>
            <Stack.Screen name={PageName.signIn} component={SignInScreen} />
            <Stack.Screen name={PageName.onboarding} component={Onboarding} />
            <Stack.Screen name={PageName.tabs} component={BottomTabNavigator} />
            <Stack.Screen name={PageName.movieDetails} component={MovieDetailsScreen} />
            <Stack.Screen name={PageName.personDetails} component={PersonDetailsScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigation;
