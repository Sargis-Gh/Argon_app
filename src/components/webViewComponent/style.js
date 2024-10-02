import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.white,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
    },
    headerContainer: {
        padding: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
    },
});

export default styles;
