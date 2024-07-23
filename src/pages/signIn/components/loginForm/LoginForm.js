import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import styles from './style'
import Error from '../error/Error'
import { t } from '../../../../localization/i18n'
import SingInButton from '../signInButton/SignInButton'
import CustomTextInput from '../../../../components/textInput/TextInput'
import { Icons, LanguageLocalizationKey, PageName } from '../../../../constants/constants'

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
    }

    handleSignIn = (navigation) => {
        const { email, password } = this.state

        const correctEmail = 'Test'
        const correctPassword = 'pass'

        if (email === correctEmail && password === correctPassword) {
            navigation.navigate(PageName.tabs)
        } else {
            this.setState({ error: 'text.invalidEmailOrPassword' })
        }
    }

    render() {
        const { email, password, error } = this.state
        const { navigation } = this.props

        return (
            <View style={styles.loginForm}>
                <CustomTextInput
                    Icon={<Icons.mail />}
                    value={email}
                    placeholderText={t('text.email', LanguageLocalizationKey.signIn)}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <CustomTextInput
                    Icon={<Icons.password />}
                    value={password}
                    secureTextEntry={true}
                    placeholderText={t('text.password', LanguageLocalizationKey.signIn)}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                {error ? (
                    <Error error={error} localizationKey={LanguageLocalizationKey.signIn} />
                ) : null}
                <SingInButton
                    onPress={() => {
                        this.handleSignIn(navigation)
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    authError: state.error,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
