import React from 'react'
import { NavigationContext } from '@react-navigation/native'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from './style'
import { Icons } from '../../constants/constants'

class AppBar extends React.Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
    }

    onPress() {
        const { text, pageName } = this.props
        navigation = this.context
        pageName ? navigation.navigate(pageName) : navigation.goBack()
    }

    render() {
        const { text, pageName } = this.props
        return (
            <View style={styles.backgroundStyle}>
                <TouchableOpacity onPress={this.onPress}>
                    <Icons.left />
                </TouchableOpacity>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        )
    }
}

export default AppBar
