import React from 'react';
import { BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { getIsFirstLaunch } from './src/utils/utils';
import MyStack from './src/navigation/stack/StackNavigator';
import { detectAndInitializeLanguage } from './src/localization/i18n';
import { BackHandlerEvents, PageName } from './src/constants/constants';

import { navigationRef } from './src/navigation/navigation';

class App extends React.Component {
    state = {
        loading: true,
        isFirstLaunch: true,
    };

    componentDidMount() {
        (async () => {
            let isFirstLaunch = true;
            try {
                await detectAndInitializeLanguage();
                isFirstLaunch = await getIsFirstLaunch();
            } finally {
                this.setState({ isFirstLaunch, loading: false });
                this.backHandler = BackHandler.addEventListener(
                    BackHandlerEvents.hardwareBackPress,
                    this.handleBackPress,
                );
                SplashScreen.hide();
            }
        })();
    }

    componentWillUnmount() {
        if (this.backHandler) {
            this.backHandler.remove();
        }
    }

    render() {
        const { loading, isFirstLaunch } = this.state;
        if (loading) return null;
        return (
            <NavigationContainer ref={navigationRef}>
                <GestureHandlerRootView>
                    <MyStack
                        initialRouteName={(isFirstLaunch && PageName.onboarding) || PageName.tabs}
                    />
                </GestureHandlerRootView>
            </NavigationContainer>
        );
    }

    handleBackPress = () => {
        const currentRouteName = this.getCurrentRouteName();
        switch (currentRouteName) {
            case PageName.home:
            case PageName.signIn:
            case PageName.onboarding:
                return true;
            default:
                return false;
        }
    };

    getCurrentRouteName = () => {
        const state = navigationRef.current?.getRootState();
        if (!state) return null;
        let route = state.routes[state.index];
        while (route.state && route.state.index !== undefined) {
            route = route.state.routes[route.state.index];
        }
        return route.name;
    };
}

export default App;
