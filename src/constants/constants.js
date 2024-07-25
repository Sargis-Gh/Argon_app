import { Dimensions } from "react-native"

export const PageName = {
    qr: 'QR',
    tabs: 'Tabs',
    home: 'Home',
    intro: 'Intro',
    drawer: 'Drawer',
    loading: 'Loading',
    profile: 'Profile',
    first: 'First Page',
    sign: 'Sign In',
    settings: 'Settings',
    favorites: 'Favorites',
    onBoarding: 'OnBoarding',
    universities: 'Universities',
}

export const Styles = {
    // Font Weihghts
    weight700: '700',
    weight600: '600',

    // Font Families
    openSans: 'Open Sans',

    // Colors
    green: '#77BB41',
    red: 'rgb(255, 0, 0)',
    blue: 'rgb(0,191,255)',
    black: 'rgb(0, 0, 0)',
    purple: 'rgb(43, 19, 137)',
    pink: 'rgb(229, 125, 222)',
    white: 'rgb(255, 255, 255)',
    grey: 'rgba(136, 152, 170, 1)',
    darkBlue: 'rgba(26, 23, 77, 1)',
    lightBlue: 'rgba(23, 43, 77, 1)',
    titleColor: 'rgba(50, 50, 93, 1)',
    lightGrey: 'rgba(202, 209, 215, 1)',
    articleColor: 'rgba(94, 114, 228, 1)',
    backgroundColor: 'rgb(243, 245, 251)',
    textInputGrey: 'rgba(173, 181, 189, 1)',
    bottomContainerColor: 'rgb(244, 245, 247)',

    // Positions
    row: 'row',
    center: 'center',
    percent20: '20%',
    percent90: '90%',
    fullSize: '100%',
    flexStart: 'flex-start',
    spaceAround: 'space-around',
    spaceBetween: 'space-between',

    alignItems: {

    },
    justifyContent: {

    },
    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    }
}


export const AppWords = {
    google: 'GOOGLE',
    gitHub: 'GITHUB',
    home: 'screens.home.title',
    viewArticle: 'View article',
    design: 'screens.first.design',
    signIn: 'screens.signIn.title',
    profile: 'screens.profile.title',
    systeam: 'screens.first.systeam',
    strongPassword: 'Strong password',
    settings: 'screens.settings.title',
    email: 'screens.signIn.text.email',
    asyncStoreFirstOpenKey: 'isFirstOpen',
    firstScreenText: 'screens.first.text',
    password: 'screens.signIn.text.password',
    signInWith: 'screens.signIn.text.signInWith',
    whatAreYouLookingFor: 'screens.home.text.whatAreYouLookingFor',
    invalidEmailOrPassword: 'screens.signIn.text.invalidEmailOrPassword',
    orSignInWithCredentials: 'screens.signIn.text.orSignInWithCredentials',
}

export const LanguageLocalizationKey = {
    en: 'en-US',
    ru: 'ru-RU',
}

export const LanguageLocalizationNSKey = {
    home: 'home',
    signIn: 'signIn',
    profile: 'profile',
    settings: 'settings',
    footerTab: 'footerTab',
    onboarding: 'onboarding',
    university: 'university',
}

export const PlatformName = {
    ios: 'ios',
    android: 'android',
}

export const DEVICE_SETTINGS = {
    windowHeight: Dimensions.get('window').height,
    windowWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('screen').height,
    screenWidth: Dimensions.get('screen').width,
}

export const AsyncStorageKeys = {
    language: 'language'
}