import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './style';
import { Styles } from '../../constants/constants';

class CustomActivityIndicator extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={Styles.large} color={Styles.white} />
            </View>
        );
    }
}

export default CustomActivityIndicator;
