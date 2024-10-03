import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Styles.white,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    body: {
        flex: 1,
        rowGap: 12,
        ...Styles.contentCenter,
    },
    title: {
        fontSize: 22,
        lineHeight: 26,
        textAlign: Styles.center,
        color: Styles.appBackground,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightSemibold,
    },
    text: {
        fontSize: 14,
        lineHeight: 19,
        textAlign: Styles.center,
        color: Styles.appBackground,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: Styles.appBackground,
    },
    buttonText: {
        fontSize: 17,
        lineHeight: 24,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightSemibold,
    },
});

export default styles;
