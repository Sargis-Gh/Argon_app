import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import { EnLanguageResources } from './translations/en';
import { RuLanguageResources } from './translations/ru';

const resources = {
  'en-US': EnLanguageResources,
  'ru-RU': RuLanguageResources,
};

const setI18nConfig = (currentLocale = 'en-US') => {
  if (!i18n.isInitialized) {
    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en-US',
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
  let deviceLanguage = 'en-US';

  if (Platform.OS === 'ios') {
    deviceLanguage = NativeModules.SettingsManager.settings.AppleLocale ||
                     NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else if (Platform.OS === 'android') {
    deviceLanguage = NativeModules.I18nManager.localeIdentifier;
  }

  return deviceLanguage.replace('_', '-'); // Ensure it uses the correct format
};

export const detectAndInitializeLanguage = () => {
  const deviceLanguage = getDeviceLanguage();
  const appLanguage = i18n.language || deviceLanguage;
  setI18nConfig(appLanguage);
};

export const changeLanguage = (currentLocale = 'en-US') => {
  i18n.changeLanguage(currentLocale);
};

export function t(name, key = 'ns', params = {}) {
  return i18n.t(name, { ...params, ns: key });
}

export default i18n;
