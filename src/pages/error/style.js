import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: Styles.center,
        backgroundColor: Styles.white,
        justifyContent: Styles.spaceBetween,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    errorMessageContainer: {
        flex: 1,
        rowGap: 8,
        ...Styles.contentCenter,
    },
    errorMessageHeader: {
        fontSize: 22,
        color: Styles.black,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightSemibold,
    },
    errorMessageBody: {
        fontSize: 14,
        color: Styles.grey,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightSemibold,
    },
    tryAgainButton: {
        borderRadius: 10,
        paddingVertical: 10,
        width: Styles.fullSize,
        ...Styles.contentCenter,
        backgroundColor: Styles.black,
    },
    buttonText: {
        fontSize: 20,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
});

export default styles;
