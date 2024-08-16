import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, SafeAreaView, TouchableOpacity, BackHandler } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import LoginForm from './components/loginForm/LoginForm';
import {
    Styles,
    AppWords,
    BackHandlerEvents,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

class SignInScreen extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener(BackHandlerEvents, this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(BackHandlerEvents.hardwareBackPress, this.handleBackPress);
    }

    render() {
        return (
            <LinearGradient
                colors={[Styles.lightBlue, Styles.darkBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <SafeAreaView>
                    <View style={styles.container}>{this.renderBody()}</View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    renderSignInWith = (icon, text) => (
        <TouchableOpacity style={styles.signInWith}>
            {icon}
            <Text style={styles.headerText}>{text}</Text>
        </TouchableOpacity>
    );

    renderBody = () => {
        const { navigation } = this.props;
        return (
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <Text style={styles.signUpWith}>
                        {t('texts.signInWith', LanguageLocalizationNSKey.signIn)}
                    </Text>
                    <View style={styles.buttons}>
                        {this.renderSignInWith(<Icons.GitHub />, AppWords.gitHub)}
                        {this.renderSignInWith(<Icons.Google />, AppWords.google)}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.signUpWith}>
                        {t('texts.orSignInWithCredentials', LanguageLocalizationNSKey.signIn)}
                    </Text>
                    <LoginForm navigation={navigation} />
                </View>
            </View>
        );
    };

    handleBackPress = () => {
        return true;
    };
}

export default SignInScreen;
