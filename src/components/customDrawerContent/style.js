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
    text: {
        fontSize: 18,
        fontFamily: Styles.openSans,
        color: Styles.appBackground,
    },
    logOutButton: {
        padding: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        justifyContent: Styles.spaceBetween,
    },
});

export default styles;
