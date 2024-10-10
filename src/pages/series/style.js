import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Styles.appBackground,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    title: {
        fontSize: 34,
        lineHeight: 60,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
    },
    item: {
        flex: 1,
        elevation: 4,
        marginRight: 16,
        shadowRadius: 4,
        borderRadius: 20,
        marginBottom: 16,
        shadowOpacity: 0.2,
        shadowColor: Styles.white,
        backgroundColor: Styles.appBackground,
        shadowOffset: { width: 0, height: 0 },
        width: DEVICE_SETTINGS.windowWidth / 3,
        height: DEVICE_SETTINGS.windowWidth / 2.3,
    },
    image: {
        flex: 1,
        padding: 12,
        borderRadius: 16,
        ...Styles.contentFlexEnd,
    },
    text: {
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    listTitle: {
        fontSize: 16,
        paddingVertical: 8,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
    },
    footer: {
        height: 50,
    },
});

export default styles;
