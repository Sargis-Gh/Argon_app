import { Dimensions, NativeModules, Platform } from 'react-native';

export const PageName = {
    qr: 'QR',
    home: 'Home',
    intro: 'Intro',
    sign: 'SignIn',
    drawer: 'Drawer',
    tabs: 'BottomTab',
    loading: 'Loading',
    profile: 'Profile',
    first: 'FirstPage',
    settings: 'Settings',
    favorites: 'Favorites',
    onboarding: 'Onboarding',
    universities: 'Universities',
};

export const Styles = {
    // Font Weihghts
    fontWeightThin: '100', // Thin
    fontWeightUltraLight: '200', // Ultra Light
    fontWeightLight: '300', // Light
    fontWeightRegular: '400', // Regular
    fontWeightMedium: '500', // Medium
    fontWeightSemibold: '600', // Semibold
    fontWeightBold: '700', // Bold
    fontWeightHeavy: '800', // Heavy
    fontWeightBlack: '900', // Black

    // Font Families
    openSans: 'Open Sans',

    // Colors
    large: 'large',
    green: '#77BB41',
    red: 'rgb(255, 0, 0)',
    blue: 'rgb(0,191,255)',
    black: 'rgb(0, 0, 0)',
    purple: 'rgb(40, 20, 131)',
    transparent: 'transparent',
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
    greyWithalpha: 'rgba(240, 239, 244, 0)',
    bottomContainerColor: 'rgb(244, 245, 247)',
    purpleWithOpacity: 'rgba(40, 20, 131, 0.5)',
    containerBackgroundColor: 'rgb(240, 239, 244)',

    // Positions
    row: 'row',
    center: 'center',
    fullSize: '100%',
    flexEnd: 'flex-end',
    flexStart: 'flex-start',
    spaceAround: 'space-around',
    spaceBetween: 'space-between',

    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export const AppWords = {
    google: 'GOOGLE',
    gitHub: 'GITHUB',
};

export const LanguageLocalizationKey = {
    en: 'en-US',
    ru: 'ru-RU',
};

export const LanguageLocalizationNSKey = {
    home: 'home',
    signIn: 'signIn',
    common: 'common',
    profile: 'profile',
    settings: 'settings',
    bottomTab: 'bottomTab',
    onboarding: 'onboarding',
    university: 'university',
};

export const PlatformName = {
    ios: 'ios',
    android: 'android',
};

const { StatusBarManager } = NativeModules;

const IosDefaultStatusBarHeight = 20;
const IosDefaultHomeIndicatorHeight = 34;
export const DEVICE_SETTINGS = {
    statusBarHeight: Platform.OS === PlatformName.ios ? StatusBarManager.HEIGHT : 0,
    isIphoneWithMonobrow:
        Platform.OS === PlatformName.ios && StatusBarManager.HEIGHT > IosDefaultStatusBarHeight,
    homeIndicatorHeight:
        Platform.OS === PlatformName.ios && StatusBarManager.HEIGHT > IosDefaultStatusBarHeight
            ? IosDefaultHomeIndicatorHeight
            : 0,
    screenHeight: Dimensions.get('screen').height,
    windowHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('screen').width,
    windowWidth: Dimensions.get('window').width,
    isAndroid: Platform.OS === PlatformName.android,
    isIOS: Platform.OS === PlatformName.ios,
    using24HourFormat: true,
};

export const AsyncStorageKeys = {
    language: 'language',
};

export const AppURL = {
    universities: 'http://universities.hipolabs.com/search?country=United+States',
};

export const Configs = {
    universitiesOpacity: 20,
};
