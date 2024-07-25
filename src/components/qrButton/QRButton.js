import React from 'react'
import { TouchableOpacity } from 'react-native'

import styles from './style'
import { Icons } from '../../constants/Icons'

class QRButton extends React.Component {
    render() {
        const { onPress } = this.props
        return (
            <TouchableOpacity activeOpacity={1} style={styles.touchableContent} onPress={onPress}>
                <Icons.QRIcon />
            </TouchableOpacity>
        )
    }
}

export default QRButton
