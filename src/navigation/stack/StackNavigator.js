import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { PageName } from '../../constants/constants'
import SignScreen from '../../pages/signIn/SignScreen'
import OnBoarding from '../../pages/onboarding/OnboardingScreen'
import BottomTabAuthNavigator from '../bottomnavigationBar/BottomNavigationbar'

const Stack = createStackNavigator()

/*
 * Add loading screen
 */
const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={PageName.onBoarding}>
            <Stack.Screen
                name={PageName.onBoarding}
                component={OnBoarding}
                options={({ navigation }) => ({
                    onBoardingScreenProps: { navigation },
                })}
            />
            <Stack.Screen
                name={PageName.sign}
                component={SignScreen}
                options={({ navigation }) => ({
                    signScreenProps: { navigation },
                    gestureEnabled: false,
                })}
            />
            <Stack.Screen
                name={PageName.tabs}
                component={BottomTabAuthNavigator}
                options={({ navigation }) => ({
                    DrawerScreenProps: { navigation },
                    gestureEnabled: false,
                })}
            />
            {/* Loading Screen */}
        </Stack.Navigator>
    )
}

export default StackNavigation
