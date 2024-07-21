import React from 'react'
import { Text } from 'react-native'

import styles from './style'

class Error extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { error } = this.props
        return <Text style={styles.field}>{error}</Text>
    }
}

export default Error
