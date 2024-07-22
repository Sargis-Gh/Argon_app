import React from "react";
import { View, Text } from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import { activeTabName } from "../../redux/action/activeTabName";

class FavoritesScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.setActiveTabName('Favorites')
    }
    render() {
        return (
            <View style={styles.background}>
                <Text>Favorites</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeTabName: state.activeTabName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveTabName(page) {
            return dispatch(activeTabName.setActiveTabName(page))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)