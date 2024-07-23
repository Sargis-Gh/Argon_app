import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles from './style'

class SignWithButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { text, Icon } = this.props
        return (
            <TouchableOpacity style={styles.backgroundStyle}>
                {Icon}
                <Text style={styles.headerText}>{text}</Text>
            </TouchableOpacity>
        )
    }
}

export default SignWithButton
