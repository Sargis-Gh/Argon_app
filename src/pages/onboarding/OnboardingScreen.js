import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'

import styles from './style'
import { t } from '../../localization/i18n'
import { OnBoardingData } from '../../mockData/MockData'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { DEVICE_SETTINGS, LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants'

import { navigationNavigate } from '../../navigation/navigation'

class OnBoarding extends React.Component {
    renderItem = (item) => {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{t(item.title, LanguageLocalizationNSKey.onboarding)}</Text>
                <Text style={styles.subtitle}>{item.text}</Text>
            </View>
        )
    }
    doneButton = () => {
        return (
            <TouchableOpacity
                style={styles.getStarted}
                activeOpacity={0.7}
                onPress={() => {
                    const { navigation } = this.props
                    navigationNavigate(navigation, PageName.sign)
                }}
            >
                <Text style={styles.getStartedText}>
                    {t('getStarted', LanguageLocalizationNSKey.onboarding)}
                </Text>
            </TouchableOpacity>
        )
    }

    nextButton = () => (
        <View style={styles.getStarted} >
            <Text style={styles.getStartedText}>
                {t('next', LanguageLocalizationNSKey.onboarding)}
            </Text>
        </View>
    )

    render() {
        return (
            <AppIntroSlider
                ref={ref => this.aaaa = ref}
                style={styles.appIntroSlider}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                data={OnBoardingData}
                renderItem={({ item }) => this.renderItem(item)}
                bottomButton={true}
                showNextButton={true}
                showSkipButton={false}
                renderDoneButton={this.doneButton}
                renderNextButton={this.nextButton}
            />
        )
    }
}

export default OnBoarding
