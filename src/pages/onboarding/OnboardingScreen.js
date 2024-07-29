import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { OnboardingData } from '../../mockData/MockData';
import { LanguageLocalizationNSKey, PageName } from '../../constants/constants';

import { navigationNavigate } from '../../navigation/navigation';

class Onboarding extends React.Component {
    renderItem = (item) => {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>
                    {t(item.title, LanguageLocalizationNSKey.onboarding)}
                </Text>
                <Text style={styles.subtitle}>{item.text}</Text>
            </View>
        );
    };

    doneButton = () => {
        return (
            <TouchableOpacity
                style={styles.getStarted}
                activeOpacity={0.7}
                onPress={() => {
                    const { navigation } = this.props;
                    navigationNavigate(navigation, PageName.sign);
                }}>
                <Text style={styles.getStartedText}>
                    {t('getStarted', LanguageLocalizationNSKey.onboarding)}
                </Text>
            </TouchableOpacity>
        );
    };

    nextButton = () => (
        <View style={styles.getStarted}>
            <Text style={styles.getStartedText}>
                {t('next', LanguageLocalizationNSKey.onboarding)}
            </Text>
        </View>
    );

    render() {
        return (
            <AppIntroSlider
                bottomButton={true}
                data={OnboardingData}
                showNextButton={true}
                showSkipButton={false}
                dotStyle={styles.dotStyle}
                style={styles.appIntroSlider}
                renderDoneButton={this.doneButton}
                renderNextButton={this.nextButton}
                activeDotStyle={styles.activeDotStyle}
                renderItem={({ item }) => this.renderItem(item)}
            />
        );
    }
}

export default Onboarding;
