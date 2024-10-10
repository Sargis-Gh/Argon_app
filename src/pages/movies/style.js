import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    headerContainer: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 34,
        lineHeight: 60,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
    },
    searchContainer: {
        height: 44,
        columnGap: 12,
        borderRadius: 22,
        marginBottom: 12,
        paddingHorizontal: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        backgroundColor: Styles.darkBlue,
    },
    inputText: {
        flex: 1,
        fontSize: 17,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightRegular,
    },
    genresList: {
        height: 40,
        marginBottom: 8,
        marginHorizontal: 16,
        backgroundColor: Styles.appBackground,
    },
    lastElement: {
        width: 16,
    },
    footer: {
        height: 50,
    },
    genreItem: {
        rowGap: 4,
        marginRight: 20,
    },
    genreItemText: (isCurrent) => ({
        fontSize: 17,
        fontFamily: Styles.openSans,
        ...(isCurrent
            ? {
                  color: Styles.lightRed,
                  fontWeight: Styles.fontWeightRegular,
              }
            : {
                  color: Styles.white,
                  fontWeight: Styles.fontWeightLight,
              }),
    }),
    genreItemLine: {
        width: 25,
        height: 1,
        backgroundColor: Styles.lightRed,
    },
    moviesList: {
        paddingHorizontal: 16,
    },
    resultContainer: {
        paddingHorizontal: 16,
        width: Styles.fullSize,
        backgroundColor: Styles.appBackground,
    },
    notFoundContainer: {
        flex: 1,
        columnGap: 16,
        flexDirection: Styles.row,
        justifyContent: Styles.center,
    },
    resultItemText: {
        fontSize: 16,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
    },
});

export default styles;
