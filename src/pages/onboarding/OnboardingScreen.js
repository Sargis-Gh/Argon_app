import React from 'react';
import FastImage from 'react-native-fast-image';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { OnboardingData } from '../../mockData/MockData';
import { LanguageLocalizationNSKey, PageName } from '../../constants/constants';

import { navigationNavigate } from '../../navigation/navigation';

class Onboarding extends React.Component {
    render() {
        return (
            <AppIntroSlider
                bottomButton={true}
                data={OnboardingData}
                dotStyle={styles.dotStyle}
                style={styles.appIntroSlider}
                activeDotStyle={styles.activeDotStyle}
                renderItem={this.renderItem}
                renderNextButton={this.nextButton}
                renderDoneButton={this.doneButton}
            />
        );
    }

    renderItem = ({ item }) => (
        <View style={styles.slide}>
            <FastImage
                source={item.image}
                style={styles.image}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <Text style={styles.title}>{t(item.title, LanguageLocalizationNSKey.onboarding)}</Text>
            <Text style={styles.subtitle}>
                {t(item.text, LanguageLocalizationNSKey.onboarding)}
            </Text>
        </View>
    );

    doneButton = () => (
        <TouchableOpacity
            delayPressIn={100}
            activeOpacity={0.8}
            style={styles.getStarted}
            onPress={() => {
                const { navigation } = this.props;
                navigationNavigate(navigation, PageName.sign);
            }}>
            <Text style={styles.getStartedText}>
                {t('getStarted', LanguageLocalizationNSKey.onboarding)}
            </Text>
        </TouchableOpacity>
    );

    nextButton = () => (
        <View style={styles.getStarted}>
            <Text style={styles.getStartedText}>
                {t('next', LanguageLocalizationNSKey.onboarding)}
            </Text>
        </View>
    );
}

export default Onboarding;
