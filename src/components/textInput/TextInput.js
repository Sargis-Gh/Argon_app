import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './style';
import { Styles } from '../../constants/constants';

class CustomTextInput extends React.Component {
    render() {
        const {
            Icon,
            value,
            onChangeText,
            placeholderText,
            iconRight = false,
            secureTextEntry = false,
            style = styles.container,
            textStyle = styles.textInput,
        } = this.props;
        return (
            <View style={style}>
                {!iconRight && Icon}
                <TextInput
                    value={value}
                    style={textStyle}
                    onChangeText={onChangeText}
                    placeholder={placeholderText}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={Styles.grey}
                />
                {iconRight && Icon}
            </View>
        );
    }
}

export default CustomTextInput;
