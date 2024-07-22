import styles from './style'
import React from 'react'
import { Text, View, Image } from 'react-native'

class OnBoardingRenderItem extends React.Component {
    render() {
        const { item } = this.props
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={{ width: '100%' }} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.text}</Text>
            </View>
        )
    }
}

export default OnBoardingRenderItem
