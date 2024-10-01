import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../../../constants/constants';

const styles = StyleSheet.create({
    similarContainer: {
        rowGap: 16,
        marginRight: 16,
        width: DEVICE_SETTINGS.windowWidth / 2 - 48,
    },
    image: {
        height: 106,
        borderRadius: 20,
    },
    text: {
        fontSize: 12,
        lineHeight: 14,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
});

export default styles;
