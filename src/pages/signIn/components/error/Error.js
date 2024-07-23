import React from 'react'
import { Text } from 'react-native'

import styles from './style'
import { t } from '../../../../localization/i18n'

class Error extends React.Component {
    render() {
        const { error, localizationKey } = this.props
        return <Text style={styles.field}>{t(error, localizationKey)}</Text>
    }
}

export default Error
