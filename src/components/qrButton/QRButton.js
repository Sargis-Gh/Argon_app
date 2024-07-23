import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import styles from './style'
import { Icons } from '../../constants/constants'

class QRButton extends React.Component {
    render() {
        const { onPress } = this.props
        return (
            <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={onPress}>
                <View style={styles.background}>{<Icons.qr />}</View>
            </TouchableOpacity>
        )
    }
}

export default QRButton
