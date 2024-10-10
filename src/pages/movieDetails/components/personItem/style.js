import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../../../constants/constants';

const styles = StyleSheet.create({
    personContainer: {
        rowGap: 8,
        marginRight: 16,
        alignItems: Styles.center,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: Styles.greyWithOpacity,
    },
    personImageBackground: {
        borderBottomLeftRadius: 44,
        borderBottomRightRadius: 44,
        backgroundColor: Styles.appBackground,
    },
    personImage: {
        margin: 4,
        aspectRatio: 1,
        width: DEVICE_SETTINGS.windowWidth / 4.5,
        borderRadius: DEVICE_SETTINGS.windowWidth / 9,
    },
    nameContainer: {
        paddingBottom: 4,
        ...Styles.contentCenter,
        width: DEVICE_SETTINGS.windowWidth / 4.5,
    },
    name: {
        color: Styles.white,
        paddingHorizontal: 8,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
    },
});

export default styles;
