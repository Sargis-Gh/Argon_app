import React from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MyStack from './src/navigation/stack/StackNavigator';
import { setFavoriteViewType } from './src/redux/action/settingsAction';
import { setLaunchDetails } from './src/redux/action/authAction';
import { getLaunchDetails, setAppSettings } from './src/utils/utils';
import { detectAndInitializeLanguage } from './src/localization/i18n';
import { BackHandlerEvents, PageName } from './src/constants/constants';

import { navigationRef, getCurrentRouteName } from './src/navigation/navigation';

class App extends React.Component {
    state = {
        loading: true,
        isSignIn: false,
        isFirstLaunch: true,
    };

    componentDidMount() {
        (async () => {
            let isSignIn = false;
            let isFirstLaunch = true;
            try {
                const { setLaunchDetails, setFavoriteViewType } = this.props;
                await detectAndInitializeLanguage();
                await setAppSettings(setFavoriteViewType);
                const data = await getLaunchDetails(setLaunchDetails);
                isSignIn = data?.isSignIn;
                isFirstLaunch = data?.isFirstLaunch;
            } finally {
                this.setState({ isFirstLaunch, isSignIn, loading: false });
                this.backHandler = BackHandler.addEventListener(
                    BackHandlerEvents.hardwareBackPress,
                    this.handleBackPress,
                );
                SplashScreen.hide();
            }
        })();
    }

    componentWillUnmount() {
        this.backHandler?.remove();
    }

    render() {
        const { loading } = this.state;
        if (loading) return null;
        const { isSignIn, isFirstLaunch } = this.state;
        return (
            <NavigationContainer ref={navigationRef}>
                <GestureHandlerRootView>
                    <MyStack
                        initialRouteName={
                            (isFirstLaunch && PageName.onboarding) ||
                            (isSignIn && PageName.tabs) ||
                            PageName.auth
                        }
                    />
                </GestureHandlerRootView>
            </NavigationContainer>
        );
    }

    handleBackPress = () => {
        const currentRouteName = getCurrentRouteName();
        switch (currentRouteName) {
            case PageName.home:
                BackHandler.exitApp();
                return true;
            case PageName.onboarding:
                BackHandler.exitApp();
                return true;
            case PageName.auth:
                navigationRef.navigate(PageName.tabs);
                return true;
            default:
                return false;
        }
    };
}

const mapDispatchToProps = (dispatch) => ({
    setFavoriteViewType: (updatedSettings) => dispatch(setFavoriteViewType(updatedSettings)),
    setLaunchDetails: (details, favorites) => dispatch(setLaunchDetails(details, favorites)),
});

export default connect(null, mapDispatchToProps)(App);
