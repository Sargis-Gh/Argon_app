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

    // Carousel Mode
    parallax: 'parallax',

    light: 'light',

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
    greyWithalpha: 'rgba(218, 218, 218, 0.4)',
    bottomContainerColor: 'rgb(244, 245, 247)',
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
    google: 'GOOGLE',
    gitHub: 'GITHUB',
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

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const Api_Key = '?api_key=50b28e2f4f87a8e4935d3f87527e1e24';

export const Endpoints = {
    movieDetails: '/movie/%S',
    topRated: '/movie/top_rated',
    popularMovies: '/movie/popular',
    nowPlaying: '/movie/now_playing',
    upcomingMovies: '/movie/upcoming',
    movieCredits: '/movie/%S/credits',
    genreMovieList: '/genre/movie/list',
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

export const movieGenres = [
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 10752, name: 'War' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 37, name: 'Western' },
    { id: 10402, name: 'Music' },
    { id: 53, name: 'Thriller' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 10751, name: 'Family' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 99, name: 'Documentary' },
    { id: 10770, name: 'TV Movie' },
    { id: 878, name: 'Science Fiction' },
];

export const tvGenres = [
    { id: 18, name: 'Drama' },
    { id: 80, name: 'Crime' },
    { id: 35, name: 'Comedy' },
    { id: 10762, name: 'Kids' },
    { id: 10763, name: 'News' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 37, name: 'Western' },
    { id: 16, name: 'Animation' },
    { id: 10751, name: 'Family' },
    { id: 9648, name: 'Mystery' },
    { id: 10764, name: 'Reality' },
    { id: 99, name: 'Documentary' },
    { id: 10768, name: 'War & Politics' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10759, name: 'Action & Adventure' },
];

export const HomeScreenDataTitles = ['topRated', 'nowPlaying', 'popular', 'upcoming'];
