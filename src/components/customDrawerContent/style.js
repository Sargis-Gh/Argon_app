import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        justifyContent: Styles.spaceBetween,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    header: {
        columnGap: 4,
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: Styles.center,
        flexDirection: Styles.row,
        borderBottomColor: Styles.grey,
    },
    drawerItems: {
        flex: 1,
        backgroundColor: Styles.white,
    },
    text: (isGuest) => ({
        fontSize: 18,
        fontFamily: Styles.openSans,
        color: (isGuest && Styles.signInButtonColor) || Styles.red,
    }),
    userText: {
        fontSize: 16,
        lineHeight: 19,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
    button: {
        width: 90,
        height: 43,
        elevation: 4,
        shadowRadius: 4,
        borderRadius: 4,
        shadowOpacity: 0.4,
        marginHorizontal: 16,
        ...Styles.contentCenter,
        shadowColor: Styles.lightGrey,
        backgroundColor: Styles.white,
        shadowOffset: { width: 0, height: 0 },
    },
});

export default styles;
