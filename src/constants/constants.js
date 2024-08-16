import { Dimensions, NativeModules, Platform } from 'react-native';

export const PageName = {
    qr: 'QR',
    home: 'Home',
    sign: 'SignIn',
    movies: 'Movies',
    drawer: 'Drawer',
    series: 'Series',
    tabs: 'BottomTab',
    details: 'Details',
    loading: 'Loading',
    profile: 'Profile',
    settings: 'Settings',
    favorites: 'Favorites',
    onboarding: 'Onboarding',
};

export const Styles = {
    // Font Weights
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
    dark: '#211F30',
    green: '#77BB41',
    black: 'rgb(0, 0, 0)',
    red: 'rgb(255, 0, 0)',
    blue: 'rgb(0,191,255)',
    transparent: 'transparent',
    pink: 'rgb(229, 125, 222)',
    white: 'rgb(255, 255, 255)',
    grey: 'rgba(136, 152, 170, 1)',
    darkBlue: 'rgba(26, 23, 77, 1)',
    lightBlue: 'rgba(23, 43, 77, 1)',
    purple: 'rgba(40, 20, 131, 0.75)',
    titleColor: 'rgba(50, 50, 93, 1)',
    lightGrey: 'rgba(202, 209, 215, 1)',
    articleColor: 'rgba(94, 114, 228, 1)',
    backgroundColor: 'rgb(243, 245, 251)',
    textInputGrey: 'rgba(173, 181, 189, 1)',
    greyWithalpha: 'rgba(240, 239, 244, 0.2)',
    bottomContainerColor: 'rgb(244, 245, 247)',
    purpleWithOpacity: 'rgba(40, 20, 131, 0.5)',
    containerBackgroundColor: 'rgb(240, 239, 244)',

    // Positions
    row: 'row',
    large: 'large',
    center: 'center',
    fullSize: '100%',
    contain: 'contain',
    stretch: 'stretch',
    flexEnd: 'flex-end',
    absolute: 'absolute',
    flexStart: 'flex-start',
    spaceAround: 'space-around',
    spaceBetween: 'space-between',

    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    fontWeightFamilyColor: {
        fontWeight: '500',
        fontFamily: 'Open Sans',
        color: 'rgb(255, 255, 255)',
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

export const BackHandlerEvents = {
    hardwareBackPress: 'hardwareBackPress',
};

export const AsyncStorageKeys = {
    language: 'language',
    favorites: 'favorites',
};

export const Endpoints = {
    getMovies: 'https://api.tvmaze.com/shows',
    getMovie: 'https://api.tvmaze.com/shows/%S',
    getActors: 'https://api.tvmaze.com/shows/%S/cast',
    getCreators: 'https://api.tvmaze.com/shows/%S/crew',
    getSeasons: 'https://api.tvmaze.com/shows/%S/seasons',
};
