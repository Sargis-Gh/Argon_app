import React from 'react'
import { withTranslation } from 'react-i18next'
// import { useSelector, useDispatch } from 'react-redux'
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

import { connect } from 'react-redux'
import { signInSuccess, signInFailure } from '../../redux/action/auth'
import { navigateToHome } from '../../redux/action/navigate'
import LoginForm from './components/loginForm/LoginForm'

class SignScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { t, navigation } = this.props
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
        const { t, navigation } = this.props
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

export default (withTranslation()(SignScreen))
