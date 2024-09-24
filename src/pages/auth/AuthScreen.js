import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { foundUser } from '../../utils/utils';
import { getItem, setItem } from '../../utils/asyncStorage';
import { setLaunchDetails } from '../../redux/action/authAction';
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

import { navigationReplace } from '../../navigation/navigation';

class AuthScreen extends React.Component {
    state = {
        inputEmail: '',
        emailError: '',
        lastNameError: '',
        passwordError: '',
        inputLastName: '',
        inputPassword: '',
        firstNameError: '',
        inputFirstName: '',
        isSignInMode: true,
        currentButton: AuthPageWords.signIn,
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Styles.padding}>
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.8}
                    style={styles.closeButton}
                    onPress={this.handleCloseButtonPress}>
                    <Icons.Close />
                </TouchableOpacity>
                {this.renderBody()}
            </KeyboardAvoidingView>
        );
    }

    renderSignInOrSignUpButton = (isSignInMode, buttonType, text) => (
        <TouchableOpacity
            delayPressIn={100}
            activeOpacity={0.8}
            style={styles.buttonContainer(isSignInMode)}
            onPress={() => this.handlePress(buttonType)}>
            <Text style={styles.subTitle(isSignInMode)}>
                {t(`texts.${text}`, LanguageLocalizationNSKey.auth)}
            </Text>
        </TouchableOpacity>
    );

    renderAuthButton = (isSignInMode) => (
        <TouchableOpacity
            delayPressIn={100}
            activeOpacity={0.8}
            style={styles.authButton}
            onPress={(isSignInMode && this.signIn) || this.signUp}>
            <Text style={styles.authButtonText}>
                {t(
                    (isSignInMode && 'texts.signIn') || 'texts.signUp',
                    LanguageLocalizationNSKey.auth,
                )}
            </Text>
        </TouchableOpacity>
    );

    renderError = (error) => (
        <Text style={styles.errorMessage}>
            {(!!error && t(`texts.${error}`, LanguageLocalizationNSKey.auth)) || ' '}
        </Text>
    );

    renderBody = () => {
        const {
            inputEmail,
            emailError,
            isSignInMode,
            inputLastName,
            inputPassword,
            passwordError,
            lastNameError,
            firstNameError,
            inputFirstName,
        } = this.state;
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
                        {this.renderError(firstNameError)}
                        <CustomTextInput
                            value={inputLastName}
                            placeholderText={t('texts.lastName', LanguageLocalizationNSKey.auth)}
                            onChangeText={(text) => this.setState({ inputLastName: text })}
                        />
                        {this.renderError(lastNameError)}
                    </>
                )}
                <CustomTextInput
                    value={inputEmail}
                    Icon={<Icons.Mail />}
                    placeholderText={t('texts.email', LanguageLocalizationNSKey.auth)}
                    onChangeText={(text) => this.setState({ inputEmail: text })}
                />
                {this.renderError(emailError)}
                <CustomTextInput
                    value={inputPassword}
                    secureTextEntry={true}
                    Icon={<Icons.Password />}
                    placeholderText={t('texts.password', LanguageLocalizationNSKey.auth)}
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                />
                {this.renderError(passwordError)}
                {this.renderAuthButton(isSignInMode)}
            </View>
        );
    };

    signIn = async () => {
        const { inputEmail, inputPassword } = this.state;
        const { navigation, setLaunchDetails } = this.props;
        if (!inputEmail || !inputPassword) {
            const emailError = !inputEmail && AuthPageWords.enterEmail;
            const passwordError = !inputPassword && AuthPageWords.enterPassword;
            this.setState({ emailError, passwordError, error: '' });
            return;
        }
        try {
            const data = await foundUser(inputEmail, inputPassword);
            if (!!data) {
                setLaunchDetails(data.user, data.favorites);
                navigationReplace(navigation, PageName.tabs);
                return;
            }
            this.setState({
                emailError: '',
                passwordError: AuthPageWords.invalidEmailOrPassword,
            });
        } catch (error) {
            this.setState({ passwordError: AuthPageWords.errorOccurredDuringSignIn });
        }
    };

    signUp = async () => {
        const { inputEmail, inputPassword, inputLastName, inputFirstName } = this.state;
        if (!inputEmail || !inputPassword || !inputLastName || !inputFirstName) {
            const emailError = !inputEmail && AuthPageWords.enterEmail;
            const passwordError = !inputPassword && AuthPageWords.enterPassword;
            const lastNameError = !inputLastName && AuthPageWords.enterLastName;
            const firstNameError = !inputFirstName && AuthPageWords.enterFirstName;
            this.setState({ emailError, passwordError, lastNameError, firstNameError });
            return;
        }
        const { emailError, passwordError } = this.validateCredentials(inputEmail, inputPassword);
        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return;
        }
        try {
            const data = await foundUser(inputEmail);
            if (!!data) {
                this.setState({
                    lastNameError: '',
                    passwordError: '',
                    firstNameError: '',
                    emailError: AuthPageWords.accountAlreadyExists,
                });
                return;
            }
            const storeData = await getItem(AsyncStorageKeys.launchData);
            const newUser = {
                id: inputEmail,
                isSignIn: true,
                email: inputEmail,
                password: inputPassword,
                lastName: inputLastName,
                firstName: inputFirstName,
            };
            storeData.users.push(newUser);
            const newUserFavorites = storeData.favorites.guest;
            storeData.favorites[newUser.id] = newUserFavorites;
            const { navigation, setLaunchDetails } = this.props;
            setLaunchDetails(newUser, newUserFavorites);
            navigationReplace(navigation, PageName.tabs);
            setItem(AsyncStorageKeys.launchData, storeData);
        } catch (error) {
            this.setState({
                emailError: '',
                lastNameError: '',
                firstNameError: '',
                passwordError: AuthPageWords.errorOccurredDuringSignUp,
            });
        }
    };

    validateCredentials = (email, password) => {
        const emailError = (!EmailRegex.test(email) && AuthPageWords.invalidEmailFormat) || '';
        const passwordError =
            (!PasswordRegex.test(password) && AuthPageWords.invalidPassword) || '';
        return { emailError, passwordError };
    };

    handlePress = (buttonType) => {
        const { currentButton, isSignInMode } = this.state;
        if (currentButton === buttonType) return;
        this.setState({
            inputEmail: '',
            emailError: '',
            lastNameError: '',
            passwordError: '',
            inputLastName: '',
            inputPassword: '',
            firstNameError: '',
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
    setLaunchDetails: (details, favorites) => dispatch(setLaunchDetails(details, favorites)),
});

export default connect(null, mapDispatchToProps)(AuthScreen);
