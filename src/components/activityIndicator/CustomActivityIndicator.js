import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './style';
import { Styles } from '../../constants/constants';

class CustomActivityIndicator extends React.Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={Styles.large} color={Styles.purple} />
            </View>
        );
    }
}

export default CustomActivityIndicator;
