import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    headerContainer: {
        columnGap: 24,
        paddingLeft: 16,
        paddingVertical: 4,
        alignItems: Styles.center,
        flexDirection: Styles.row,
    },
    headerTitle: {
        ...Styles.header,
    },
    itemHeader: {
        paddingTop: 4,
        paddingLeft: 36,
        ...Styles.header,
    },
    item: {
        flex: 1,
        elevation: 20,
        marginRight: 16,
        borderRadius: 28,
        shadowRadius: 16,
        shadowOpacity: 0.3,
        shadowColor: Styles.white,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: Styles.appBackground,
    },
    image: {
        flex: 1,
        borderRadius: 28,
    },
    standardItemDetails: {
        bottom: 0,
        margin: 12,
        width: 220,
        height: 60,
        columnGap: 20,
        borderWidth: 1,
        borderRadius: 20,
        ...Styles.contentCenter,
        position: Styles.absolute,
        flexDirection: Styles.row,
        borderColor: Styles.appBackgroundOpacity,
    },
    nonStandardItemDetails: {
        bottom: 0,
        height: 82,
        margin: 16,
        width: '90%',
        borderWidth: 1,
        borderRadius: 20,
        ...Styles.contentCenter,
        alignSelf: Styles.center,
        position: Styles.absolute,
        borderColor: Styles.appBackgroundOpacity,
    },
    title: {
        fontSize: 24,
        color: Styles.white,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
    },
    continue: {
        fontSize: 15,
        color: Styles.grey,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightRegular,
    },
    readyPlayer: {
        fontSize: 17,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightRegular,
    },
    rating: {
        top: 0,
        right: 0,
        width: 85,
        margin: 16,
        height: 50,
        columnGap: 4,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 20,
        ...Styles.contentCenter,
        borderColor: Styles.grey,
        flexDirection: Styles.row,
        position: Styles.absolute,
        borderColor: Styles.appBackgroundOpacity,
    },
    ratingValue: {
        fontSize: 20,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    listFooterComponent: {
        height: 50,
    },
});

export default styles;
