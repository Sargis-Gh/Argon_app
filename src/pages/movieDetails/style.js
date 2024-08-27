import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    backIcon: {
        width: 40,
        height: 40,
        margin: 16,
        borderRadius: 20,
        ...Styles.contentCenter,
        position: Styles.absolute,
    },
    image: {
        height: 290,
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
        marginRight: 16,
        alignItems: Styles.center,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        justifyContent: Styles.spaceBetween,
        backgroundColor: Styles.greyWithalpha,
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
        paddingBottom: 8,
        ...Styles.contentCenter,
    },
    name: {
        color: Styles.white,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
    },
    footer: {
        height: 100,
    },
});

export default styles;
