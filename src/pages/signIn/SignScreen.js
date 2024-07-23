import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from './style'
import { t } from '../../localization/i18n'
import AppBar from '../../components/appBar/AppBar'
import LoginForm from './components/loginForm/LoginForm'
import SignWithButton from './components/signWithButton/SignWithButton'
import { AppColors, AppWords, Icons, LanguageLocalizationKey, PageName } from '../../constants/constants'

class SignScreen extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <LinearGradient
                colors={[AppColors.lightBlue, AppColors.darkBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <SafeAreaView>
                    <View style={styles.background}>
                        <AppBar
                            text={t('title', LanguageLocalizationKey.signIn)}
                            pageName={PageName.tabs}
                            navigation={navigation}
                        />
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
                    <Text style={styles.signUpWith}>{t('text.signInWith', LanguageLocalizationKey.signIn)}</Text>
                    <View style={styles.buttons}>
                        <SignWithButton text={AppWords.gitHub} Icon={<Icons.gitHub />} />
                        <SignWithButton text={AppWords.google} Icon={<Icons.google />} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.signUpWith}>
                        {t('text.orSignInWithCredentials', LanguageLocalizationKey.signIn)}
                    </Text>
                    <LoginForm navigation={navigation}/>
                </View>
            </View>
        )
    }
}

export default SignScreen
