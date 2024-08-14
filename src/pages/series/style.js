import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.purple,
        paddingTop: DEVICE_SETTINGS.statusBarHeight,
        paddingBottom: DEVICE_SETTINGS.homeIndicatorHeight,
    },
    header: {
        padding: 16,
        ...Styles.contentCenter,
    },
    headerText: {
        fontSize: 20,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    item: {
        borderWidth: 1,
        marginVertical: 4,
        borderColor: Styles.purpleWithOpacity,
    },
    image: {
        height: Styles.fullSize,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        resizeMode: Styles.contain,
    },
});

export default styles;
