import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './style';
import { Icons } from '../../constants/Icons';
import { Styles } from '../../constants/constants';

import { navigationGoBack } from '../../navigation/navigation';

class NavigationBar extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity delayPressIn={100} activeOpacity={0.8} onPress={this.onPress}>
                    <Icons.Back fill={Styles.appBackground} />
                </TouchableOpacity>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        );
    }

    onPress = () => {
        const { navigation } = this.props;
        navigationGoBack(navigation);
    };
}

export default NavigationBar;
