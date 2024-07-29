import React from 'react'
import { View, TextInput } from 'react-native'

import styles from './style'
import { Styles } from '../../constants/constants'

class CustomTextInput extends React.Component {
    render() {
        const {
            Icon,
            value,
            onChangeText,
            placeholderText,
            iconRight = false,
            secureTextEntry = false,
            style = styles.background,
            textStyle = styles.textInput,
        } = this.props
        return (
            <View style={style}>
                {!iconRight && Icon}
                <TextInput
                    style={textStyle}
                    value={value}
                    placeholder={placeholderText}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={Styles.grey}
                />
                {iconRight ? Icon : null}
            </View>
        )
    }
}

export default CustomTextInput
