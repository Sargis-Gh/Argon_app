import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


import styles from './style'
import { t } from '../../../../localization/i18n'

class OnboardingButtons extends React.Component {
    handleButtonClick = async () => {
        try {
            await AsyncStorage.setItem(AppWords.asyncStoreFirstOpenKey, JSON.stringify(true))
            dispatch(setIsFirstOpen(true))
            navigation.replace(PageName.drawer)
        } catch (e) {}
    }
    render() {
        const { navigation} = this.props
        return (
            <View style={styles.background}>
                <TouchableOpacity
                    style={styles.getStarted}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate(PageName.sign)}
                    >
                    <Text style={styles.getStartedText}>{t('screens.onBoarding.getStarted')}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={this.handleButtonClick}>
                    <Text style={styles.closeText}>{t('screens.onBoarding.close')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default OnboardingButtons
