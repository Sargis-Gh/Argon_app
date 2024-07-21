import React from 'react'
import { withTranslation } from 'react-i18next'
// import { useSelector, useDispatch } from 'react-redux'
import { NavigationContext } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { Text, View, SafeAreaView } from 'react-native'

import styles from './style'
import Error from './components/error/Error'
import AppBar from '../../components/appBar/AppBar'
import SingInButton from './components/signInButton/SignInButton'
import CustomTextInput from '../../components/textInput/TextInput'
import { AppWords, Icons, PageName } from '../../constants/constants'
import SignWithButton from './components/signWithButton/SignWithButton'
// import { setEmail, setPassword, setError, clearError } from '../../redux/sore'
// import { googleAnalytics } from '../../utils/analytics'

class SignScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props
        return (
            <LinearGradient
                colors={['rgba(23, 43, 77, 1)', 'rgba(26, 23, 77, 1)']}
                start={{ x: 0, y: 0 }} // Start at the top-left corner
                end={{ x: 1, y: 0 }} // End at the bottom-right corner
            >
                <SafeAreaView>
                    <View style={styles.background}>
                        <AppBar text={t(AppWords.signIn)} pageName={PageName.drawer} />
                        <Body t={t} />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}
class Body extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props
        return (
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <Text style={styles.signUpWith}>{t(AppWords.signInWith)}</Text>
                    <View style={styles.buttons}>
                        <SignWithButton text={AppWords.gitHub} Icon={<Icons.gitHub />} />
                        <SignWithButton text={AppWords.google} Icon={<Icons.google />} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.signUpWith}>{t(AppWords.orSignInWithCredentials)}</Text>
                    <LoginForm t={t} />
                </View>
            </View>
        )
    }
}

class LoginForm extends React.Component {
    static contextType = NavigationContext

    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin() {
        const { email, password, dispatch, t } = this.props
        const navigation = this.context

        if (email === 'test@example.com' && password === 'password') {
            dispatch(clearError())
            navigation.navigate(PageName.loading)
        } else {
            dispatch(setError(t(AppWords.invalidEmailOrPassword)))
        }
    }

    render() {
        const { email, password, error, t, dispatch } = this.props

        return (
            <View style={styles.loginForm}>
                <CustomTextInput
                    Icon={<Icons.mail />}
                    value={email}
                    placeholderText={t(AppWords.email)}
                    onChangeText={(text) => dispatch(setEmail(text))}
                />
                <CustomTextInput
                    Icon={<Icons.password />}
                    value={password}
                    secureTextEntry={true}
                    placeholderText={t(AppWords.password)}
                    onChangeText={(text) => dispatch(setPassword(text))}
                />
                {error ? <Error error={error} /> : null}
                <SingInButton onPress={this.handleLogin} t={t} />
            </View>
        )
    }
}

export default withTranslation()(SignScreen)
