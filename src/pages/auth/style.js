import { StyleSheet } from 'react-native';

import { Styles, DEVICE_SETTINGS } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 16,
        padding: 16,
        justifyContent: Styles.center,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    closeButton: {
        alignSelf: Styles.flexStart,
    },
    body: {
        rowGap: 16,
        padding: 16,
        borderRadius: 10,
        alignItems: Styles.center,
        backgroundColor: Styles.white,
    },
    text: (isButton) => ({
        flex: 1,
        fontSize: 14,
        lineHeight: 19,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightRegular,
        color: (isButton && Styles.appBackground) || Styles.darkGrey,
    }),
    signInOrSignUp: {
        columnGap: 16,
        paddingBottom: 8,
        width: Styles.fullSize,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        justifyContent: Styles.spaceBetween,
    },
    buttonContainer: (isActive) => ({
        flex: 1,
        height: 40,
        elevation: 3,
        borderRadius: 8,
        shadowRadius: 3,
        shadowOpacity: 0.7,
        ...Styles.contentCenter,
        shadowColor: Styles.textInputGrey,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: (isActive && Styles.appBackground) || Styles.white,
    }),
    subTitle: (isActive) => ({
        fontSize: 14,
        lineHeight: 19,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
        color: (isActive && Styles.white) || Styles.appBackground,
    }),
    authButton: (selected) => ({
        height: 40,
        elevation: 3,
        borderRadius: 8,
        shadowRadius: 5,
        shadowOpacity: 0.7,
        paddingHorizontal: 16,
        ...Styles.contentCenter,
        shadowColor: Styles.grey,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: (selected && Styles.appBackground) || Styles.grey,
    }),
    authButtonText: {
        fontSize: 14,
        lineHeight: 19,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
    errorMessage: {
        fontSize: 12,
        lineHeight: 17,
        color: Styles.red,
        alignSelf: Styles.flexStart,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightRegular,
    },
    rowContainer: {
        columnGap: 4,
        alignItems: Styles.center,
        flexDirection: Styles.row,
        alignSelf: Styles.flexStart,
    },
});

export default styles;
