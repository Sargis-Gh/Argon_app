import i18n from 'i18next'
import i18next from 'i18next'

import { EnLanguageResources } from './translations/en'
import { RuLanguageResources } from './translations/ru'

const resources = {
    'en-US': EnLanguageResources,
    'ru-RU': RuLanguageResources,
}

const setI18nConfig = (currentLocale = 'ru-RU') => {
    i18n.init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en-US',
        lng: currentLocale,
        debug: true,
        resources,
        returnObjects: true,
    })
}

export const detectAndInitializeLanguage = () => {
    // If App local language is missing we need to detect device language and set it as default
    // If App local language already initialized we need use it
    // setI18nConfig(localLanguage || detectedLanguage);
    setI18nConfig()
}

export const changeLanguage = (currentLocale = 'en') => {
    i18next.t(currentLocale)
}

export function t(name, key = 'ns', params = {}) {
    return i18next.t(name, { ...params, ns: key })
}

export default i18n
