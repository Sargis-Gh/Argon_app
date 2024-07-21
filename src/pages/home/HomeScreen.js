import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.background}>
                <Text>Home</Text>
            </View>
        )
    }
}

export default HomeScreen