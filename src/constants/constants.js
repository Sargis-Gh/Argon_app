import { Dimensions, NativeModules, Platform } from 'react-native';

export const PageName = {
    qr: 'QR',
    home: 'Home',
    sign: 'SignIn',
    movies: 'Movies',
    drawer: 'Drawer',
    series: 'Series',
    tabs: 'BottomTab',
    loading: 'Loading',
    profile: 'Profile',
    settings: 'Settings',
    favorites: 'Favorites',
    onboarding: 'Onboarding',
    movieDetails: 'MovieDetails',
    personDetails: 'PersonDetails',
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

    // Carousel Mode
    parallax: 'parallax',

    light: 'light',
    transparent: 'transparent',

    // Colors
    green: '#77BB41',
    black: 'rgb(0, 0, 0)',
    red: 'rgb(255, 0, 0)',
    blue: 'rgb(0,191,255)',
    white: 'rgb(255, 255, 255)',
    grey: 'rgba(188, 188, 188, 1)',
    appBackground: 'rgb(23, 23, 23)',
    lightGrey: 'rgba(202, 209, 215, 1)',
    articleColor: 'rgba(94, 114, 228, 1)',
    blackWithOpacity: 'rgba(0, 0, 0, 0.5)',
    textInputGrey: 'rgba(173, 181, 189, 1)',
    bottomContainerColor: 'rgb(244, 245, 247)',
    greyWithOpacity: 'rgba(218, 218, 218, 0.2)',
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

    header: {
        fontSize: 25,
        color: 'white',
        fontWeight: '400',
        fontFamily: 'Open Sans',
    },
};

export const AppWords = {
    focus: 'focus',
    ended: 'ended',
    google: 'GOOGLE',
    gitHub: 'GITHUB',
    trailer: 'Trailer',
};

export const LanguageLocalizationKey = {
    en: 'en-US',
    ru: 'ru-RU',
};

export const Language = {
    en: 'en',
};

export const LanguageLocalizationNSKey = {
    home: 'home',
    signIn: 'signIn',
    common: 'common',
    profile: 'profile',
    settings: 'settings',
    bottomTab: 'bottomTab',
    onboarding: 'onboarding',
    personDetails: 'personDetails',
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

export const filmDefaultSource = require('../assets/images/filmDefaultSource.jpeg');

export const carouselItemCountLimit = 20;

export const PAGE = '&page=6';
export const LANGUAGE = '?language=';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const API_KEY = '&api_key=50b28e2f4f87a8e4935d3f87527e1e24';

export const Endpoints = {
    // Home Page
    topRated: '/movie/top_rated',
    popularMovies: '/movie/popular',
    nowPlaying: '/movie/now_playing',
    upcomingMovies: '/movie/upcoming',

    // Movie Details
    movieDetails: '/movie/%S',
    movieVideos: '/movie/%S/videos',
    movieCredits: '/movie/%S/credits',

    // TV Shows Details
    tvShowsDetails: '/tv/%S',
    tvVideos: '/tv/%S/videos',
    tvCredits: '/tv/%S/credits',

    // Person Details
    personDetails: '/person/%S',
    personTVCredits: '/person/%S/tv_credits',
    personMovieCredits: '/person/%S/movie_credits',
};

export const PromiseStatus = {
    rejected: 'rejected',
    fulfilled: 'fulfilled',
};

export const KnownForDepartment = {
    art: 'Art',
    crew: 'Crew',
    acting: 'Acting',
    directing: 'Directing',
};

export const CreditType = {
    movie: 'movie',
    tvShow: 'tvShow',
};

export const HomeScreenDataTitles = ['topRated', 'nowPlaying', 'popular', 'upcoming'];
