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
    headerButtonsContainer: {
        top: 0,
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: Styles.fullSize,
        position: Styles.absolute,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        justifyContent: Styles.spaceBetween,
        backgroundColor: Styles.blackWithOpacity,
    },
    backIcon: {
        padding: 8,
        aspectRatio: 1,
        ...Styles.contentCenter,
    },
    image: {
        height: 225,
        width: DEVICE_SETTINGS.windowWidth,
    },
    aboutMovieContainer: {
        rowGap: 12,
        padding: 16,
    },
    title: {
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
    releaseGenreSubContainer: {
        flex: 0.5,
        rowGap: 12,
    },
    subTitle: {
        fontSize: 16,
        ...Styles.fontWeightFamilyColor,
    },
    genreItem: {
        marginRight: 8,
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
    subContainer: {
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
        margin: 4,
        aspectRatio: 1,
        width: DEVICE_SETTINGS.windowWidth / 4.5,
        borderRadius: DEVICE_SETTINGS.windowWidth / 9,
    },
    nameContainer: {
        paddingBottom: 4,
        ...Styles.contentCenter,
        width: DEVICE_SETTINGS.windowWidth / 4.5,
    },
    name: {
        color: Styles.white,
        paddingHorizontal: 8,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
    },
    footer: {
        height: 50,
    },
    playButton: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        ...Styles.contentCenter,
        position: Styles.absolute,
        backgroundColor: Styles.blackWithOpacity,
    },
});

export default styles;
