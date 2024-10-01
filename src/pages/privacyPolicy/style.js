import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.white,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    header: {
        padding: 16,
        columnGap: 16,
        alignItems: Styles.center,
        flexDirection: Styles.row,
        backgroundColor: Styles.white,
    },
    title: {
        fontSize: 18,
        fontFamily: Styles.openSans,
        color: Styles.appBackground,
        fontWeight: Styles.fontWeightMedium,
    },
});

export default styles;
