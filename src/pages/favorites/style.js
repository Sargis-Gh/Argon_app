import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    gestureContainer: {
        flex: 1,
    },
    rightActionContainer: {
        padding: 16,
        justifyContent: Styles.center,
        backgroundColor: Styles.lightRed,
    },
    deleteText: {
        fontSize: 14,
        lineHeight: 18,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        justifyContent: Styles.spaceBetween,
    },
    title: {
        fontSize: 34,
        lineHeight: 60,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
    },
    menu: (display) => ({
        right: 16,
        position: Styles.absolute,
        backgroundColor: Styles.white,
        width: DEVICE_SETTINGS.windowWidth * 0.7,
        top: DEVICE_SETTINGS.statusBarHeight + 60,
        display: (display && Styles.flex) || Styles.none,
    }),
    menuItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        backgroundColor: Styles.white,
        borderBottomColor: Styles.grey,
        justifyContent: Styles.spaceBetween,
    },
    menuItemText: {
        fontSize: 16,
        lineHeight: 22,
        fontFamily: Styles.openSans,
        color: Styles.appBackground,
        fontWeight: Styles.fontWeightRegular,
    },
    selectionContainer: {
        padding: 16,
        columnGap: 16,
        ...Styles.contentCenter,
        flexDirection: Styles.row,
    },
    selectionButtonContainer: (isMovies) => ({
        height: 40,
        columnGap: 12,
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        ...Styles.contentCenter,
        flexDirection: Styles.row,
        borderColor: Styles.white,
        backgroundColor: (isMovies && Styles.white) || Styles.appBackground,
    }),
    selectionButtonText: (isMovies) => ({
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
        color: (isMovies && Styles.appBackground) || Styles.white,
    }),
    listFooterComponent: {
        height: 100,
    },
    favoriteItem: (isRow) => ({
        backgroundColor: Styles.white,
        ...(isRow
            ? {
                  padding: 12,
                  height: 125,
                  borderRadius: 0,
                  width: Styles.fullSize,
                  flexDirection: Styles.row,
              }
            : {
                  marginRight: 16,
                  borderRadius: 16,
                  flexDirection: Styles.column,
                  width: (DEVICE_SETTINGS.windowWidth - 48) / 2, // Subtract 48px (16px padding + 16px gap) from window width, then divide by 2 for two components
              }),
    }),
    contentContainerStyle: (isRow) => ({
        rowGap: 16,
        paddingLeft: !isRow && 16,
    }),
    image: (isRow) => ({
        ...(isRow
            ? {
                  width: 104,
                  borderRadius: 20,
                  height: Styles.fullSize,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
              }
            : {
                  height: 150,
                  borderRadius: 0,
                  width: Styles.fullSize,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
              }),
    }),
    movieDetails: (isRow) => ({
        flex: 1,
        rowGap: 8,
        paddingHorizontal: 12,
        paddingVertical: !isRow && 12,
    }),
    subDetails: {
        columnGap: 8,
        flexDirection: Styles.row,
    },
    genres: {
        flex: 1,
        justifyContent: Styles.spaceBetween,
    },
    movieTitle: {
        flex: 1,
        fontSize: 14,
        lineHeight: 18,
        color: Styles.appBackground,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
    rating: {
        height: 24,
        borderRadius: 12,
        paddingHorizontal: 8,
        ...Styles.contentCenter,
        flexDirection: Styles.row,
        backgroundColor: Styles.appBackground,
    },
    ratingText: {
        color: Styles.white,
    },
    buttonsContainer: {
        padding: 12,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        justifyContent: Styles.spaceBetween,
    },
    buttonText: (isRemove) => ({
        fontSize: 12,
        lineHeight: 17,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
        color: (isRemove && Styles.red) || Styles.articleColor,
    }),
    button: (isRow) => ({
        alignSelf: (isRow && Styles.flexEnd) || Styles.flexStart,
    }),
});

export default styles;
