import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import { EnLanguageResources } from './translations/en';
import { RuLanguageResources } from './translations/ru';
import { LanguageLocalizationKey, PlatformName } from '../constants/constants';

const resources = {
    [LanguageLocalizationKey.en_US]: EnLanguageResources,
    [LanguageLocalizationKey.ru_RU]: RuLanguageResources,
};

const setI18nConfig = (currentLocale = LanguageLocalizationKey.en_US) => {
  if (!i18n.isInitialized) {
    i18n
      .use(initReactI18next)
      .init({
        compatibilityJSON: 'v3',
        fallbackLng: LanguageLocalizationKey.en_US,
        lng: currentLocale,
        debug: true,
        resources,
        returnObjects: true,
      });
  } else {
    i18n.changeLanguage(currentLocale);
  }
};

const getDeviceLanguage = () => {
  let deviceLanguage = LanguageLocalizationKey.en_US;

  if (Platform.OS === PlatformName.ios) {
    deviceLanguage = NativeModules.SettingsManager.settings.AppleLocale ||
                     NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else if (Platform.OS === PlatformName.android) {
    deviceLanguage = NativeModules.I18nManager.localeIdentifier;
  }

  return deviceLanguage.replace('_', '-');
};

export const detectAndInitializeLanguage = () => {
  const deviceLanguage = getDeviceLanguage();
  const appLanguage = i18n.language || deviceLanguage;
  setI18nConfig(LanguageLocalizationKey.ru_RU);
};

export const changeLanguage = (currentLocale = LanguageLocalizationKey.en_US) => {
  i18n.changeLanguage(currentLocale);
};

export function t(name, key = 'ns', params = {}) {
  return i18n.t(name, { ...params, ns: key });
}

export default i18n;
