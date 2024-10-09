import i18n from 'i18next';
import { NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { errorHandling } from '../utils/errorHandlers';
import { EnLanguageResources } from './translations/en';
import { RuLanguageResources } from './translations/ru';
import {
    Language,
    PlatformName,
    AsyncStorageKeys,
    LanguageLocalizationKey,
} from '../constants/constants';

const resources = {
    [LanguageLocalizationKey.en]: EnLanguageResources,
    [LanguageLocalizationKey.ru]: RuLanguageResources,
};

const setI18nConfig = (currentLocale = LanguageLocalizationKey.en) => {
    if (i18n.isInitialized) {
        i18n.changeLanguage(currentLocale);
        return;
    }
    i18n.init({
        resources,
        debug: true,
        lng: currentLocale,
        returnObjects: true,
        compatibilityJSON: 'v3',
        fallbackLng: LanguageLocalizationKey.en,
    });
};

const getDeviceLanguage = () => {
    try {
        let deviceLanguage = Language.en;

        if (PlatformName.ios === Platform.OS) {
            deviceLanguage =
                NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages?.[0] ||
                Language.en;
        } else if (PlatformName.android === Platform.OS) {
            deviceLanguage = NativeModules.I18nManager.localeIdentifier || Language.en;
        }

        return deviceLanguage.split('_')[0];
    } catch (error) {
        errorHandling(error);
        return Language.en;
    }
};

export const detectAndInitializeLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem(AsyncStorageKeys.language);
    if (storedLanguage) {
        setI18nConfig(storedLanguage);
        return;
    }
    const deviceLanguage = getDeviceLanguage();
    const language = LanguageLocalizationKey[deviceLanguage] || LanguageLocalizationKey.en;

    await AsyncStorage.setItem(AsyncStorageKeys.language, language);
    setI18nConfig(language);
};

export const changeLanguage = (currentLocale = LanguageLocalizationKey.en) => {
    i18n.changeLanguage(currentLocale);
};

export const t = (name, key = 'ns', params = {}) => i18n.t(name, { ...params, ns: key });

export const getCurrentLanguage = () => i18n.language.slice(0, 2);

export default i18n;
