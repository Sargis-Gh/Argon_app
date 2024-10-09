import { Dimensions, NativeModules, Platform } from 'react-native';

export const ReduxTypes = {
    setUser: 'setUser',
    signOut: 'signOutT',
    setGenres: 'setGenres',
    setFavorites: 'setFavorites',
    setFavoriteViewType: 'setFavoriteViewType',
};

export const PageName = {
    home: 'Home',
    auth: 'Auth',
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
    privacyPolicy: 'Privacy Policy',
    termsAndConditions: 'Terms & Conditions',
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
    black: 'rgb(0, 0, 0)',
    blue: 'rgb(0,191,255)',
    red: 'rgb(183, 28, 28)',
    green: 'rgb(120, 187, 65)',
    grey: 'rgb(188, 188, 188)',
    darkBlue: 'rgb(33, 31, 48)',
    white: 'rgb(255, 255, 255)',
    darkGrey: 'rgb(82, 95, 127)',
    lightGrey: 'rgb(202, 209, 215)',
    lightRed: 'rgba(235, 87, 87, 1)',
    appBackground: 'rgb(23, 23, 23)',
    articleColor: 'rgb(94, 114, 228)',
    lightBackground: 'rgb(40, 40, 40)',
    textInputGrey: 'rgb(173, 181, 189)',
    signInButtonColor: 'rgb(27, 88, 135)',
    blackWithOpacity: 'rgba(0, 0, 0, 0.5)',
    bottomContainerColor: 'rgb(244, 245, 247)',
    greyWithOpacity: 'rgba(218, 218, 218, 0.3)',
    containerBackgroundColor: 'rgb(240, 239, 244)',

    // Positions
    row: 'row',
    none: 'none',
    flex: 'flex',
    large: 'large',
    column: 'column',
    center: 'center',
    fullSize: '100%',
    padding: 'padding',
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

    contentFlexEnd: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
    page: 'Page',
    guest: 'guest',
    focus: 'focus',
    ended: 'ended',
    imdb: '(IMDB)',
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
    auth: 'auth',
    movies: 'movies',
    common: 'common',
    profile: 'profile',
    tvSeries: 'tvSeries',
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
    users: 'users',
    genres: 'genres',
    settings: 'settings',
    language: 'language',
};

export const DefaultSource = {
    film: require('../assets/images/filmDefaultSource.jpeg'),
    person: require('../assets/images/personDefaultSource.png'),
};

export const CarouselItemCountLimit = 20;

export const PAGE = '&page=1';
export const QUERY = '&query=';
export const LANGUAGE = '&language=';
export const WITH_GENRE = '&with_genres=%S';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const API_KEY = '?api_key=50b28e2f4f87a8e4935d3f87527e1e24';
export const PrivacyPolicyUrl = 'https://shortly.film/terms-and-conditions-filmmaker/';
export const TermsAndConditionsUrl = 'https://shortly.film/terms-and-conditions-filmmaker/';

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

    // TV Series Details
    tvSeriesDetails: '/tv/%S',
    tvVideos: '/tv/%S/videos',
    tvCredits: '/tv/%S/credits',

    // Person Details
    personDetails: '/person/%S',
    personTVCredits: '/person/%S/tv_credits',
    personMovieCredits: '/person/%S/movie_credits',

    // Movie Page
    movies: '/discover/movie',
    searchMovie: '/search/movie',

    // TV Series
    onTheAir: '/tv/on_the_air',
    popularTVSeries: '/tv/popular',
    airingToDay: '/tv/airing_today',
    topRatedSeries: '/tv/top_rated',

    // Genres
    genres: '/genre/movie/list',

    // Similar Movies
    similarMovies: '/movie/%S/similar',

    // Similar TV Series
    similarTVSeries: '/tv/%S/similar',
};

export const PromiseStatus = {
    rejected: 'rejected',
    fulfilled: 'fulfilled',
};

export const KnownForDepartment = {
    acting: 'Acting',
};

export const CreditType = {
    movie: 'movie',
    tvSeries: 'tvSeries',
};

export const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{9,})/;

export const HomeScreenDataTitles = ['topRated', 'nowPlaying', 'popular', 'upcoming'];

export const SeriesScreenDataTitles = [
    'onTheAir',
    'airingToDay',
    'topRatedSeries',
    'popularTVSeries',
];

export const Users = {
    guest: {
        email: 'guest',
        isSignIn: false,
        firstName: 'guest',
        favorites: { movie: [], tvSeries: [] },
    },
};

export const TextInputOptions = {
    oneTimeCode: 'oneTimeCode',
};

export const AuthPageWords = {
    guest: 'guest',
    signIn: 'signIn',
    signUp: 'signUp',
    signOut: 'signOut',
    enterEmail: 'enterEmail',
    createAccount: 'createAccount',
    enterPassword: 'enterPassword',
    enterLastName: 'enterLastName',
    enterFirstName: 'enterFirstName',
    invalidPassword: 'invalidPassword',
    invalidEmailFormat: 'invalidEmailFormat',
    accountAlreadyExists: 'accountAlreadyExists',
    invalidEmailOrPassword: 'invalidEmailOrPassword',
    errorOccurredDuringSignIn: 'errorOccurredDuringSignIn',
    errorOccurredDuringSignUp: 'errorOccurredDuringSignUp',
};

export const FavoritePageWords = {
    row: 'row',
    keyOne: '-',
    keyTwo: '+',
    movie: 'movies',
    remove: 'remove',
    column: 'column',
    series: 'series',
    favorites: 'favorites',
    viewDetails: 'viewDetails',
    cardDisplayType: 'cardDisplayType',
};

export const ReturnKeyType = {
    search: 'search',
};

export const CrashlyticsErrorNames = {
    apiError: 'api_error',
    genericError: 'generic_error',
    crashlyticsErrorBoundary: 'error_boundary',
};

export const AnalyticsLogEventName = {
    openPage: 'open_page',
    buttonClick: 'button_click',
};

export const AnalyticsDescriptions = {
    play: 'Play',
    close: 'Close',
    signIn: 'Sign In',
    details: 'Details',
    addFavorite: 'Add Favorite',
    readeToPlay: 'Ready To Play',
    createAccount: 'Create Account',
    removeFavorite: 'Remove Favorite',
    languageRu: 'Language From %S To RU',
    languageEn: 'Language From %S To EN',
    cardDisplayTypeRow: 'Card Display Type Column To Row',
    cardDisplayTypeColumn: 'Card Display Type Row To Column',
};
