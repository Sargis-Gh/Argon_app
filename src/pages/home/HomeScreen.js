import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import styles from './style'
import { activeTabName } from '../../redux/action/activeTabName'

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.background}>
                <Text>Home</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
