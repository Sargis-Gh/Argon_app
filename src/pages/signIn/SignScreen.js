import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { Text, View, SafeAreaView } from 'react-native'

import styles from './style'
import AppBar from '../../components/appBar/AppBar'
import { AppWords, Icons, PageName } from '../../constants/constants'
import SignWithButton from './components/signWithButton/SignWithButton'
// import { setEmail, setPassword, setError, clearError } from '../../redux/sore'
// import { googleAnalytics } from '../../utils/analytics'
import { t } from '../../localization/i18n'
import LoginForm from './components/loginForm/LoginForm'

class SignScreen extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <LinearGradient
                colors={['rgba(23, 43, 77, 1)', 'rgba(26, 23, 77, 1)']}
                start={{ x: 0, y: 0 }} // Start at the top-left corner
                end={{ x: 1, y: 0 }} // End at the bottom-right corner
            >
                <SafeAreaView>
                    <View style={styles.background}>
                        {/* <AppBar
                            text={t(AppWords.signIn, 'global')}
                            pageName={PageName.tabs}
                            navigation={navigation}
                        /> */}
                        <Body navigation={navigation}/>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}
class Body extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <Text style={styles.signUpWith}>{t(AppWords.signInWith, 'global')}</Text>
                    <View style={styles.buttons}>
                        <SignWithButton text={AppWords.gitHub} Icon={<Icons.gitHub />} />
                        <SignWithButton text={AppWords.google} Icon={<Icons.google />} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.signUpWith}>
                        {t(AppWords.orSignInWithCredentials, 'global')}
                    </Text>
                    <LoginForm navigation={navigation}/>
                </View>
            </View>
        )
    }
}

export default SignScreen
