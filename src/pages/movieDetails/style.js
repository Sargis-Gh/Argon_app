import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.purple,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    backIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginVertical: 24,
        marginHorizontal: 16,
        ...Styles.contentCenter,
        position: Styles.absolute,
        backgroundColor: Styles.greyWithalpha,
        marginVertical: DEVICE_SETTINGS.statusBarHeight,
    },
    image: {
        height: 300,
        resizeMode: Styles.stretch,
        width: DEVICE_SETTINGS.windowWidth,
        marginTop: DEVICE_SETTINGS.statusBarHeight,
    },
    aboutMovieContainer: {
        rowGap: 12,
        padding: 16,
    },
    movieName: {
        fontSize: 24,
        ...Styles.fontWeightFamilyColor,
    },
    minutesAndRatings: {
        columnGap: 8,
        flexDirection: Styles.row,
        alignItems: Styles.center,
    },
    text: {
        fontSize: 12,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    releaseGenreContainer: {
        flexDirection: Styles.row,
    },
    releaseContainer: {
        flex: 0.5,
        rowGap: 12,
    },
    releaseDate: {
        fontSize: 16,
        ...Styles.fontWeightFamilyColor,
    },
    genresContainer: {
        flex: 0.5,
        rowGap: 12,
        alignItems: Styles.flexStart,
    },
    genreItemsContainer: {
        columnGap: 8,
    },
    genreItem: {
        borderRadius: 22,
        paddingVertical: 4,
        paddingHorizontal: 12,
        ...Styles.contentCenter,
        backgroundColor: Styles.black,
    },
    genreItemText: {
        fontSize: 14,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    description: {
        rowGap: 12,
    },
});

export default styles;
