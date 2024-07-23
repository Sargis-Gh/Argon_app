import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import styles from './style'
import { t } from '../../../../localization/i18n'
import { LanguageLocalizationKey, PageName } from '../../../../constants/constants'

class OnboardingButtons extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.background}>
                <TouchableOpacity
                    style={styles.getStarted}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate(PageName.sign)}>
                    <Text style={styles.getStartedText}>
                        {t('getStarted', LanguageLocalizationKey.onboarding)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate(PageName.sign)}>
                    <Text style={styles.closeText}>
                        {t('close', LanguageLocalizationKey.onboarding)}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default OnboardingButtons
