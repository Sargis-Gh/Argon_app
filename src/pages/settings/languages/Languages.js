import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import { Icons } from '../../../constants/Icons';
import { stringFormat } from '../../../utils/utils';
import { errorHandling } from '../../../utils/errorHandlers';
import { changeLanguage, t } from '../../../localization/i18n';
import { analyticsLogEvent } from '../../../analytics/analytics';
import {
    PageName,
    AsyncStorageKeys,
    AnalyticsDescriptions,
    AnalyticsLogEventName,
    LanguageLocalizationKey,
    LanguageLocalizationNSKey,
} from '../../../constants/constants';

import { navigationRefreshWithoutReload } from '../../../navigation/navigation';

class Languages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: props.selectedLanguage,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {t('texts.languages', LanguageLocalizationNSKey.settings)}
                    </Text>
                    {this.renderLanguageButtons()}
                </View>
            </View>
        );
    }

    renderLanguageButtons = () => {
        const { selectedLanguage } = this.state;
        const buttonsData = [
            {
                icon: <Icons.USAflag />,
                isSelected: LanguageLocalizationKey.en === selectedLanguage,
                text: t('texts.english', LanguageLocalizationNSKey.settings),
                selectLanguage: () =>
                    this.selectLanguage(
                        LanguageLocalizationKey.en,
                        AnalyticsDescriptions.languageEn,
                    ),
            },
            {
                icon: <Icons.Russia />,
                isSelected: LanguageLocalizationKey.ru === selectedLanguage,
                text: t('texts.russian', LanguageLocalizationNSKey.settings),
                selectLanguage: () =>
                    this.selectLanguage(
                        LanguageLocalizationKey.ru,
                        AnalyticsDescriptions.languageRu,
                    ),
            },
        ];
        return (
            <View style={styles.languageButtonContainer}>
                {buttonsData.map(({ text, icon, isSelected, selectLanguage }) => (
                    <View key={text} style={styles.languageButtonContent}>
                        <TouchableOpacity
                            delayPressIn={100}
                            activeOpacity={0.4}
                            style={styles.languageButton}
                            onPress={selectLanguage}>
                            {icon}
                            <Text style={styles.languageButtonText}>{text}</Text>
                        </TouchableOpacity>
                        {isSelected && <View style={styles.checked} />}
                    </View>
                ))}
            </View>
        );
    };

    selectLanguage = (language, description) => {
        try {
            AsyncStorage.setItem(AsyncStorageKeys.language, language);
            this.setState({ selectedLanguage: language });
            changeLanguage(language);
            navigationRefreshWithoutReload();
            this.handleButtonClickForAnalytics(description);
        } catch (error) {
            errorHandling(error);
        }
    };

    handleButtonClickForAnalytics = (description) => {
        const { selectedLanguage } = this.state;
        analyticsLogEvent(AnalyticsLogEventName.buttonClick, {
            pageName: PageName.settings,
            description: stringFormat(description, selectedLanguage.split('-')[0].toUpperCase()),
        });
    };
}

export default Languages;
