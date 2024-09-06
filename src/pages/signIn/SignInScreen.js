import React from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import LoginForm from './components/loginForm/LoginForm';
import { Styles, AppWords, LanguageLocalizationNSKey } from '../../constants/constants';

class SignInScreen extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Styles.padding}>
                {this.renderBody()}
            </KeyboardAvoidingView>
        );
    }

    renderSignInWith = (icon, text) => (
        <TouchableOpacity style={styles.signInWith} delayPressIn={100}>
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
}

export default SignInScreen;
