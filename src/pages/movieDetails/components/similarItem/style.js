import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../../../constants/constants';

const styles = StyleSheet.create({
    similarContainer: {
        rowGap: 16,
        marginRight: 16,
        width: DEVICE_SETTINGS.windowWidth / 2 - 48, // Subtract 48px (16px padding + 16px gap) from window width, then divide by 2 for two components
    },
    image: {
        height: 106,
        borderRadius: 20,
    },
    text: (isDate) => ({
        fontSize: 12,
        lineHeight: 14,
        fontFamily: Styles.openSans,
        color: (isDate && Styles.grey) || Styles.white,
    }),
});

export default styles;
