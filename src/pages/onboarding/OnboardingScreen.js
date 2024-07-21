import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './style'

class OnboardingScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.background}>
                <TouchableOpacity>
                    <Text style={{fontSize: 25}}>Close</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default OnboardingScreen