import { StyleSheet } from 'react-native';

import { Styles, DEVICE_SETTINGS } from '../../constants/constants';

const styles = StyleSheet.create({
    itemHeader: {
        paddingTop: 4,
        paddingLeft: 36,
        ...Styles.header,
    },
    standardBaseOptions: {
        width: DEVICE_SETTINGS.windowWidth,
        height: DEVICE_SETTINGS.windowWidth * 0.6,
    },
    nonStandardBaseOptions: {
        width: DEVICE_SETTINGS.windowWidth,
        height: DEVICE_SETTINGS.windowWidth * 1.2,
    },
});

export default styles;
