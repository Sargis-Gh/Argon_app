import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from './style'
import { Icons } from '../../constants/Icons'
import { navigationNavigate } from '../../navigation/navigation'

class NavigationBar extends React.Component {
    onPress = () => {
        const { navigation, pageName } = this.props
        navigationNavigate(navigation, pageName)
    }

    render() {
        const { text } = this.props

        return (
            <View style={styles.backgroundStyle}>
                <TouchableOpacity
                    onPress={this.onPress}>
                    <Icons.Left />
                </TouchableOpacity>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        )
    }
}

export default NavigationBar
