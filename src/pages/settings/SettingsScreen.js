import React from "react";
import { View, Text } from "react-native";

import styles from "./style";

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.background}>
                <Text>Settings</Text>
            </View>
        )
    }
}

export default SettingsScreen