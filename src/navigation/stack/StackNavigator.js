import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PageName } from '../../constants/constants'
import SignScreen from '../../pages/signIn/SignScreen'

// import Tabs from '../tabs/tabs'
import DrawerNavigator from '../drawer/Drawer'
import OnBoarding from '../../pages/onboarding/OnboardingScreen'
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
            {/* <Stack.Screen
                name={PageName.drawer}
                component={DrawerNavigator}
                options={({ navigation }) => ({
                    DrawerScreenProps: { navigation },
                    gestureEnabled: false,
                })}
            /> */}
            <Stack.Screen
                name={PageName.tabs}
                component={BottomTabAuthNavigator}
                // options={{ animation: Animations.none }}
                options={({ navigation }) => ({
                    DrawerScreenProps: { navigation },
                    gestureEnabled: false,
                })}
            />
            {/* <Stack.Screen name={PageName.loading} component={LoadingScreen} /> */}
        </Stack.Navigator>
    )
}

export default StackNavigation
