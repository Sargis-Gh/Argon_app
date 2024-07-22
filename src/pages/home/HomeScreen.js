import React from 'react'
import { View, Text } from 'react-native'
import styles from './style'
import { connect } from 'react-redux'
import { activeTabName } from '../../redux/action/activeTabName'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidUpdate(){
        const {activeTabName} = this.props;
        console.log('HomeScreen', 'componentDidMount=',activeTabName);
    }
    render() {
        const {activeTabName} = this.props;
        console.log('HomeScreen', '111activeTabName=',activeTabName);
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
