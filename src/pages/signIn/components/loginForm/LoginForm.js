import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { signInSuccess, signInFailure } from '../../../../redux/action/auth'
import SingInButton from '../signInButton/SignInButton'
import CustomTextInput from '../../../../components/textInput/TextInput'
import { AppWords, Icons, PageName } from '../../../../constants/constants'
import styles from './style'
import Error from '../error/Error'
import { t } from '../../../../localization/i18n'

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
            signInSuccess()
            navigation.navigate(PageName.tabs)
        } else {
            signInFailure('Invalid email or password')
            this.setState({ error: 'Invalid email or password' })
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
                    placeholderText={t(AppWords.email, 'global')}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <CustomTextInput
                    Icon={<Icons.password />}
                    value={password}
                    secureTextEntry={true}
                    placeholderText={t(AppWords.password, 'global')}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                {error ? <Error error={error} /> : null}
                <SingInButton onPress={()=> {this.handleSignIn(navigation)}} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    authError: state.error,
})

const mapDispatchToProps = (dispatch) => ({
    signInSuccess,
    signInFailure,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
