import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    aboutContainer: {
        rowGap: 16,
        marginTop: 16,
    },
    image: {
        height: 340,
        width: DEVICE_SETTINGS.windowWidth,
        justifyContent: Styles.spaceBetween,
    },
    backIcon: {
        width: 40,
        margin: 16,
        aspectRatio: 1,
        borderRadius: 20,
        ...Styles.contentCenter,
    },
    name: {
        fontSize: 30,
        width: Styles.fullSize,
        color: Styles.lightGrey,
        textAlign: Styles.center,
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
        elevation: 5,
        marginRight: 16,
        shadowRadius: 5,
        borderRadius: 28,
        shadowOpacity: 0.2,
        shadowColor: Styles.white,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: Styles.appBackground,
    },
    itemImage: (hasRating) => ({
        flex: 1,
        padding: 16,
        borderRadius: 28,
        justifyContent: (hasRating && Styles.spaceBetween) || Styles.flexEnd,
    }),
    rating: {
        padding: 16,
        columnGap: 4,
        borderRadius: 20,
        ...Styles.contentCenter,
        flexDirection: Styles.row,
        alignSelf: Styles.flexEnd,
        backgroundColor: Styles.blackWithOpacity,
    },
    baseOptions: {
        width: DEVICE_SETTINGS.windowWidth,
        height: DEVICE_SETTINGS.windowWidth * 0.6,
    },
    details: {
        padding: 16,
        borderRadius: 20,
        ...Styles.contentCenter,
        backgroundColor: Styles.blackWithOpacity,
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
        height: 100,
    },
});

export default styles;
