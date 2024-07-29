import i18n from 'i18next';
import { NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { EnLanguageResources } from './translations/en';
import { RuLanguageResources } from './translations/ru';
import { AsyncStorageKeys, LanguageLocalizationKey, PlatformName } from '../constants/constants';

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
        compatibilityJSON: 'v3',
        fallbackLng: LanguageLocalizationKey.en,
        lng: currentLocale,
        debug: true,
        resources,
        returnObjects: true,
    });
};

const getDeviceLanguage = () => {
    try {
        let deviceLanguage =
            (Platform.OS === PlatformName.ios &&
                NativeModules.SettingsManager.settings.AppleLocale) ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] ||
            NativeModules.I18nManager.localeIdentifier;
        return deviceLanguage.replace('_', '-');
    } catch (_) {
        return LanguageLocalizationKey.en;
    }
};

export const detectAndInitializeLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem(AsyncStorageKeys.language);
    if (storedLanguage) {
        setI18nConfig(storedLanguage);
        return;
    }
    const deviceLanguage = getDeviceLanguage();
    setI18nConfig(deviceLanguage);
};

export const changeLanguage = (currentLocale = LanguageLocalizationKey.en) => {
    i18n.changeLanguage(currentLocale);
};

export function t(name, key = 'ns', params = {}) {
    return i18n.t(name, { ...params, ns: key });
}

export default i18n;
