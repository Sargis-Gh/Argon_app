import React from "react"
import { Text, View } from "react-native"
import styles from "./style"

class UniversitiesScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.background}>
                <Text>Universities</Text>
            </View>
        )
    }
}

export default UniversitiesScreen