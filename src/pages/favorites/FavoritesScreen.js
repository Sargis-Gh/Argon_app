import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

class FavoritesScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.background}>
                <Text>Favorites</Text>
            </View>
        )
    }
}

export default FavoritesScreen