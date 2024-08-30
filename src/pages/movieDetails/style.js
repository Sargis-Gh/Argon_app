import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    headerContainer: {
        ...Styles.contentCenter,
    },
    backIcon: {
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        margin: 16,
        borderRadius: 20,
        ...Styles.contentCenter,
        position: Styles.absolute,
    },
    image: {
        height: 225,
        width: DEVICE_SETTINGS.windowWidth,
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
    titleText: {
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
        backgroundColor: Styles.blackWithOpacity,
    },
    genreItemText: {
        fontSize: 14,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    description: {
        rowGap: 12,
    },
    creditsContainer: {
        rowGap: 16,
    },
    personContainer: {
        rowGap: 8,
        marginRight: 16,
        alignItems: Styles.center,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: Styles.greyWithOpacity,
    },
    personImageBackground: {
        borderBottomLeftRadius: 44,
        borderBottomRightRadius: 44,
        backgroundColor: Styles.appBackground,
    },
    personImage: {
        width: 80,
        margin: 4,
        height: 80,
        borderRadius: 40,
    },
    nameContainer: {
        width: 80,
        paddingBottom: 4,
        ...Styles.contentCenter,
    },
    name: {
        paddingHorizontal: 8,
        color: Styles.white,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
    },
    footer: {
        height: 100,
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        ...Styles.contentCenter,
        position: Styles.absolute,
        backgroundColor: Styles.blackWithOpacity,
    },
    adult: {
        top: 0,
        right: 0,
        margin: 16,
        position: Styles.absolute,
    },
});

export default styles;
