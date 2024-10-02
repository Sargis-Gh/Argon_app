import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { foundUser } from '../../utils/utils';
import { setUser } from '../../redux/action/userAction';
import { getItem, setItem } from '../../utils/asyncStorage';
import { genericErrorHandling } from '../../utils/errorHandlers';
import CustomTextInput from '../../components/textInput/TextInput';
import {
    Styles,
    PageName,
    EmailRegex,
    PasswordRegex,
    AuthPageWords,
    AsyncStorageKeys,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationNavigate, navigationReplace } from '../../navigation/navigation';

class AuthScreen extends React.Component {
    state = {
        error: '',
        inputEmail: '',
        selected: false,
        inputLastName: '',
        inputPassword: '',
        inputFirstName: '',
        isSignInMode: true,
        currentButton: AuthPageWords.signIn,
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Styles.padding}>
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.4}
                    style={styles.closeButton}
                    onPress={this.handleCloseButtonPress}>
                    <Icons.FillClose />
                </TouchableOpacity>
                {this.renderBody()}
            </KeyboardAvoidingView>
        );
    }

    renderSignInOrSignUpButton = (isSignInMode, buttonType, text) => (
        <TouchableOpacity
            delayPressIn={100}
            activeOpacity={0.4}
            style={styles.buttonContainer(isSignInMode)}
            onPress={() => this.handlePress(buttonType)}>
            <Text style={styles.subTitle(isSignInMode)}>
                {t(`texts.${text}`, LanguageLocalizationNSKey.auth)}
            </Text>
        </TouchableOpacity>
    );

    renderAuthButton = ([value, authFunction, text]) => (
        <TouchableOpacity
            disabled={!value}
            delayPressIn={100}
            activeOpacity={0.4}
            style={styles.authButton(value)}
            onPress={authFunction}>
            <Text style={styles.authButtonText}>
                {t(`texts.${text}`, LanguageLocalizationNSKey.auth)}
            </Text>
        </TouchableOpacity>
    );

    renderError = () => {
        const { error } = this.state;
        return (
            <Text style={styles.errorMessage}>
                {(!!error && t(`texts.${error}`, LanguageLocalizationNSKey.auth)) || ''}
            </Text>
        );
    };

    renderBody = () => {
        const { inputEmail, isSignInMode, inputLastName, inputPassword, inputFirstName, selected } =
            this.state;
        return (
            <View style={styles.body}>
                <View style={styles.signInOrSignUp}>
                    {this.renderSignInOrSignUpButton(
                        isSignInMode,
                        AuthPageWords.signIn,
                        AuthPageWords.signIn,
                    )}
                    {this.renderSignInOrSignUpButton(
                        !isSignInMode,
                        AuthPageWords.signUp,
                        AuthPageWords.signUp,
                    )}
                </View>
                {!isSignInMode && (
                    <>
                        <CustomTextInput
                            value={inputFirstName}
                            placeholderText={t('texts.firstName', LanguageLocalizationNSKey.auth)}
                            onChangeText={(text) => this.setState({ inputFirstName: text })}
                        />
                        <CustomTextInput
                            value={inputLastName}
                            placeholderText={t('texts.lastName', LanguageLocalizationNSKey.auth)}
                            onChangeText={(text) => this.setState({ inputLastName: text })}
                        />
                    </>
                )}
                <CustomTextInput
                    value={inputEmail}
                    Icon={<Icons.Mail />}
                    onBlur={!isSignInMode && this.emailValidation}
                    placeholderText={t('texts.email', LanguageLocalizationNSKey.auth)}
                    onChangeText={(text) => this.setState({ inputEmail: text })}
                />
                <CustomTextInput
                    value={inputPassword}
                    secureTextEntry={true}
                    Icon={<Icons.Password />}
                    onBlur={!isSignInMode && this.passwordValidation}
                    placeholderText={t('texts.password', LanguageLocalizationNSKey.auth)}
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                />
                {!isSignInMode && <>{this.renderCheckBoxContainer()}</>}
                {this.renderError()}
                {this.renderAuthButton(
                    (isSignInMode && [isSignInMode, this.signIn, AuthPageWords.signIn]) || [
                        selected,
                        this.signUp,
                        AuthPageWords.signUp,
                    ],
                )}
            </View>
        );
    };

    renderCheckBoxContainer = () => {
        const { selected } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.rowContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({ selected: !selected });
                    }}>
                    {(selected && <Icons.Selected />) || <Icons.Selected fill={Styles.grey} />}
                </TouchableOpacity>
                <Text style={styles.text()}>
                    {t('texts.agreeWith', LanguageLocalizationNSKey.auth)}{' '}
                    <Text
                        style={styles.text(true)}
                        onPress={() => navigationNavigate(navigation, PageName.privacyPolicy)}>
                        {t('texts.privacyPolicy', LanguageLocalizationNSKey.auth)}
                    </Text>
                </Text>
            </View>
        );
    };

    emailValidation = () => {
        const { inputEmail } = this.state;
        const error = (!EmailRegex.test(inputEmail) && AuthPageWords.invalidEmailFormat) || '';
        this.setState({ error });
    };

    passwordValidation = () => {
        const { inputPassword } = this.state;
        const error = (!PasswordRegex.test(inputPassword) && AuthPageWords.invalidPassword) || '';
        this.setState({ error });
    };

    signIn = async () => {
        const { navigation, setUser } = this.props;
        const { inputEmail, inputPassword } = this.state;
        if (!inputEmail) {
            this.setState({ error: AuthPageWords.enterEmail });
            return;
        }
        if (!inputPassword) {
            this.setState({ error: AuthPageWords.enterPassword });
            return;
        }
        try {
            const user = await foundUser(inputEmail, inputPassword);
            if (user) {
                setUser(user);
                navigationReplace(navigation, PageName.tabs);
                return;
            }
            this.setState({ error: AuthPageWords.invalidEmailOrPassword });
        } catch (e) {
            genericErrorHandling(e);
            this.setState({ error: AuthPageWords.errorOccurredDuringSignIn });
        }
    };

    signUp = async () => {
        const { inputEmail, inputPassword, inputLastName, inputFirstName } = this.state;
        if (!inputFirstName) {
            this.setState({ error: AuthPageWords.enterFirstName });
            return;
        }
        if (!inputLastName) {
            this.setState({ error: AuthPageWords.enterLastName });
            return;
        }
        if (!inputEmail) {
            this.setState({ error: AuthPageWords.enterEmail });
            return;
        }
        if (!inputPassword) {
            this.setState({ error: AuthPageWords.enterPassword });
            return;
        }
        if (!EmailRegex.test(inputEmail)) {
            this.setState({ error: AuthPageWords.invalidEmailFormat });
            return;
        }
        if (!PasswordRegex.test(inputPassword)) {
            this.setState({ error: AuthPageWords.invalidPassword });
            return;
        }
        try {
            const data = await foundUser(inputEmail);
            if (data) {
                this.setState({ error: AuthPageWords.accountAlreadyExists });
                return;
            }
            const { navigation, setUser } = this.props;
            const users = await getItem(AsyncStorageKeys.users);
            const newUser = {
                isSignIn: true,
                email: inputEmail,
                password: inputPassword,
                lastName: inputLastName,
                firstName: inputFirstName,
                favorites: users?.guest?.favorites,
            };
            users[inputEmail] = newUser;
            setUser(newUser);
            setItem(AsyncStorageKeys.users, users);
            navigationReplace(navigation, PageName.tabs);
        } catch (e) {
            genericErrorHandling(e);
            this.setState({ error: AuthPageWords.errorOccurredDuringSignUp });
        }
    };

    handlePress = (buttonType) => {
        const { currentButton, isSignInMode } = this.state;
        if (currentButton === buttonType) return;
        this.setState({
            error: '',
            inputEmail: '',
            selected: false,
            inputLastName: '',
            inputPassword: '',
            inputFirstName: '',
            currentButton: buttonType,
            isSignInMode: !isSignInMode,
        });
    };

    handleCloseButtonPress = () => {
        const { navigation } = this.props;
        navigationReplace(navigation, PageName.tabs);
    };
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (details) => dispatch(setUser(details)),
});

export default connect(null, mapDispatchToProps)(AuthScreen);
