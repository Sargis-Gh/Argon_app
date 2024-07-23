import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from './style'
import { Icons } from '../../constants/constants'

class AppBar extends React.Component {
    onPress(navigation, pageName) {
        navigation.navigate(pageName)
    }

    render() {
        const { navigation, pageName, text } = this.props

        return (
            <View style={styles.backgroundStyle}>
                <TouchableOpacity
                    onPress={() => {
                        this.onPress(navigation, pageName)
                    }}>
                    <Icons.left />
                </TouchableOpacity>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        )
    }
}

export default AppBar
