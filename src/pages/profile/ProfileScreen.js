import React from "react"
import { Text, View } from "react-native"
import styles from "./style"

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.background}>
                <Text>Profile</Text>
            </View>
        )
    }
}

export default ProfileScreen