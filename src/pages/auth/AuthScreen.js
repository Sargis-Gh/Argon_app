import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { foundUser } from '../../utils/utils';
import { setUser } from '../../redux/action/userAction';
import { getItem, setItem } from '../../utils/asyncStorage';
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
        inputEmail: '',
        emailError: '',
        selected: false,
        lastNameError: '',
        passwordError: '',
        inputLastName: '',
        inputPassword: '',
        firstNameError: '',
        inputFirstName: '',
        isSignInMode: false,
        isPasswordStrong: false,
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
                    <Icons.Close />
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

    renderAuthButton = (isSignInMode) => {
        const { selected } = this.state;
        const style = (isSignInMode && styles.authButton(true)) || styles.authButton(selected);
        return (
            <TouchableOpacity
                style={style}
                delayPressIn={100}
                activeOpacity={0.4}
                disabled={!selected}
                onPress={(isSignInMode && this.signIn) || this.signUp}>
                <Text style={styles.authButtonText}>
                    {t(
                        (isSignInMode && 'texts.signIn') || 'texts.signUp',
                        LanguageLocalizationNSKey.auth,
                    )}
                </Text>
            </TouchableOpacity>
        );
    };

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
                    onChangeText={(text) => this.passwordChange(text)}
                />
                {this.renderError(passwordError)}
                {!isSignInMode && (
                    <>
                        {this.renderPasswordStrengthContainer()}
                        {this.renderCheckBoxContainer()}
                    </>
                )}
                {this.renderAuthButton(isSignInMode)}
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
                    {t('texts.agreeWith', LanguageLocalizationNSKey.auth)}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.4}
                    style={styles.privacyPolicyButton}
                    onPress={() => navigationNavigate(navigation, PageName.termsAndConditions)}>
                    <Text style={styles.text(true)}>
                        {t('texts.privacyPolicy', LanguageLocalizationNSKey.auth)}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderPasswordStrengthContainer = () => {
        const { isPasswordStrong } = this.state;
        return (
            <View style={styles.rowContainer}>
                <Text style={styles.text()}>
                    {t('texts.passwordStrength', LanguageLocalizationNSKey.auth)}
                </Text>
                <Text style={styles.strengthText(isPasswordStrong)}>
                    {(isPasswordStrong && 'Strong') || 'Bad'}
                </Text>
            </View>
        );
    };

    passwordChange = (inputPassword) => {
        const isPasswordStrong = PasswordRegex.test(inputPassword);
        this.setState({ isPasswordStrong, inputPassword });
    };

    signIn = async () => {
        const { navigation, setUser } = this.props;
        const { inputEmail, inputPassword } = this.state;
        if (!inputEmail) {
            this.setError({ emailError: AuthPageWords.enterEmail });
            return;
        }
        if (!inputPassword) {
            this.setError({ passwordError: AuthPageWords.enterPassword });
            return;
        }
        try {
            const user = await foundUser(inputEmail, inputPassword);
            if (user) {
                setUser(user);
                navigationReplace(navigation, PageName.tabs);
                return;
            }
            this.setError({ passwordError: AuthPageWords.invalidEmailOrPassword });
        } catch (error) {
            this.setError({ passwordError: AuthPageWords.errorOccurredDuringSignIn });
        }
    };

    signUp = async () => {
        const { inputEmail, inputPassword, inputLastName, inputFirstName } = this.state;
        if (!inputFirstName) {
            this.setError({ firstNameError: AuthPageWords.enterFirstName });
            return;
        }
        if (!inputLastName) {
            this.setError({ lastNameError: AuthPageWords.enterLastName });
            return;
        }
        if (!inputEmail) {
            this.setError({ emailError: AuthPageWords.enterEmail });
            return;
        }
        if (!inputPassword) {
            this.setError({ passwordError: AuthPageWords.enterPassword });
            return;
        }
        const { emailError, passwordError } = this.validateCredentials(inputEmail, inputPassword);
        if (emailError || passwordError) {
            this.setError({ emailError, passwordError });
            return;
        }
        try {
            const data = await foundUser(inputEmail);
            if (data) {
                this.setError({ emailError: AuthPageWords.accountAlreadyExists });
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
        } catch (error) {
            this.setError({ passwordError: AuthPageWords.errorOccurredDuringSignUp });
        }
    };

    setError = (error) => {
        this.setState({
            emailError: '',
            passwordError: '',
            lastNameError: '',
            firstNameError: '',
            ...error,
        });
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
    setUser: (details) => dispatch(setUser(details)),
});

export default connect(null, mapDispatchToProps)(AuthScreen);
