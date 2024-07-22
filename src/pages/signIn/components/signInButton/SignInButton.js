import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import styles from './style'
import { t } from '../../../../localization/i18n'

class SingInButton extends React.Component {
    render() {
        const { onPress } = this.props
        return (
            <TouchableOpacity style={styles.signIn} activeOpacity={0.7} onPress={onPress}>
                <Text style={styles.signInText}>{t('screens.signIn.title', 'global')}</Text>
            </TouchableOpacity>
        )
    }
}

export default SingInButton