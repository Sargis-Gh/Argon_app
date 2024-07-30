import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    appIntroSlider: {
        backgroundColor: Styles.white,
    },
    dotStyle: {
        backgroundColor: Styles.lightGrey,
    },
    activeDotStyle: {
        backgroundColor: Styles.articleColor,
    },
    buttonContainer: {
        paddingBottom: 20,
        alignItems: Styles.center,
        justifyContent: Styles.center,
        backgroundColor: Styles.white,
    },
    getStarted: {
        padding: 8,
        borderRadius: 10,
        alignItems: Styles.center,
        backgroundColor: Styles.articleColor,
    },
    getStartedText: {
        fontSize: 18,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    slide: {
        alignItems: Styles.center,
        justifyContent: Styles.center,
        backgroundColor: Styles.white,
    },
    image: {
        width: Styles.fullSize,
        height: DEVICE_SETTINGS.windowHeight / 2,
    },
    title: {
        fontSize: 20,
        fontFamily: Styles.openSans,
        color: Styles.articleColor,
    },
    subtitle: {
        padding: 16,
        fontSize: 15,
        color: Styles.grey,
        fontFamily: Styles.openSans,
        textAlign: Styles.center,
    },
});

export default styles;
