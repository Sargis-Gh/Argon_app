import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    pageTitle: (focused) => ({
        fontSize: 14,
        lineHeight: 19,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightRegular,
        color: (focused && Styles.white) || Styles.appBackground,
    }),
});

export default styles;
