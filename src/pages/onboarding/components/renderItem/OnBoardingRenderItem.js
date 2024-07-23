import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from './style'
import { t } from '../../../../localization/i18n'
import { LanguageLocalizationKey } from '../../../../constants/constants'

class OnBoardingRenderItem extends React.Component {
    render() {
        const { item } = this.props
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{t(item.title, LanguageLocalizationKey.onboarding)}</Text>
                <Text style={styles.subtitle}>{item.text}</Text>
            </View>
        )
    }
}

export default OnBoardingRenderItem
