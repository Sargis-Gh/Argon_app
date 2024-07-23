import React from "react";
import { View, Text } from "react-native";

import styles from "./style";

class QRScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.background}>
                <Text>QR</Text>
            </View>
        )
    }
}

export default QRScreen