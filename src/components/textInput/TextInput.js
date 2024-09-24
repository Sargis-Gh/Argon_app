import React from 'react';
import { View, TextInput } from 'react-native';

import styles from './style';
import { Styles, TextInputOptions } from '../../constants/constants';

class CustomTextInput extends React.Component {
    render() {
        const {
            Icon,
            value,
            onChangeText,
            placeholderText,
            needIcon = true,
            iconRight = false,
            secureTextEntry = false,
            style = styles.container,
            textStyle = styles.textInput,
        } = this.props;
        return (
            <View style={style}>
                {!iconRight && needIcon && Icon}
                <TextInput
                    value={value}
                    style={textStyle}
                    spellCheck={false}
                    autoCorrect={false}
                    onChangeText={onChangeText}
                    placeholder={placeholderText}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={Styles.grey}
                    textContentType={TextInputOptions.oneTimeCode}
                />
                {iconRight && needIcon && Icon}
            </View>
        );
    }
}

export default CustomTextInput;
