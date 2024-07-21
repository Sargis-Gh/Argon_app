import React from 'react'
import { View, TextInput } from 'react-native'

import styles from './style'
import { AppColors } from '../../constants/constants'

class CustomTextInput extends React.Component {
    constructor(props) {
        super(props)
    }

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
                {!iconRight ? Icon : null}
                <TextInput
                    style={textStyle}
                    value={value}
                    placeholder={placeholderText}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={AppColors.grey}
                />
                {iconRight ? Icon : null}
            </View>
        )
    }
}

export default CustomTextInput
