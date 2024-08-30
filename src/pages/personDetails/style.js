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
        backgroundColor: Styles.greyWithOpacity,
    },
    aboutContainer: {
        rowGap: 16,
        marginTop: 16,
    },
    headerContainerWithoutImage: {
        ...Styles.contentCenter,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    image: {
        height: 320,
        width: DEVICE_SETTINGS.windowWidth,
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
    name: {
        bottom: 0,
        fontSize: 30,
        width: Styles.fullSize,
        color: Styles.lightGrey,
        textAlign: Styles.center,
        position: Styles.absolute,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightSemibold,
        backgroundColor: Styles.blackWithOpacity,
    },
    title: {
        fontSize: 16,
        ...Styles.fontWeightFamilyColor,
    },
    carouselTitle: {
        fontSize: 16,
        marginLeft: 16,
        ...Styles.fontWeightFamilyColor,
    },
    text: {
        fontSize: 14,
        color: Styles.white,
        fontFamily: Styles.openSans,
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
    itemImage: {
        flex: 1,
        borderRadius: 28,
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
    baseOptions: {
        width: DEVICE_SETTINGS.windowWidth,
        height: DEVICE_SETTINGS.windowWidth * 0.6,
    },
    details: {
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
    infoContainer: {
        rowGap: 8,
        ...Styles.contentCenter,
    },
    subInfoContainer: {
        columnGap: 8,
        flexDirection: Styles.row,
        alignItems: Styles.center,
    },
    horizontalContainer: {
        paddingHorizontal: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        justifyContent: Styles.spaceAround,
    },
    verticalContainer: {
        paddingHorizontal: 16,
    },
    footer: {
        height: 50,
    },
});

export default styles;
