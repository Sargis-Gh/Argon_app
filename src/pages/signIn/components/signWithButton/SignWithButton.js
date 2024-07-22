import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
// import analytics from '@react-native-firebase/analytics'

import styles from './style'

class SignWithButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { Navigation, text, Icon, onPress } = this.props
        return (
            <TouchableOpacity
                style={styles.backgroundStyle}
                // onPress={async () =>
                //     await analytics().logEvent('googleSign', {
                //         id: 3745092,
                //         item: 'sign in with google',
                //     })
                // }
            >
                {Icon}
                <Text style={styles.headerText}>{text}</Text>
            </TouchableOpacity>
        )
    }
}

export default SignWithButton
