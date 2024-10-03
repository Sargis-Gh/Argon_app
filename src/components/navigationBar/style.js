import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        height: 25,
        width: Styles.fullSize,
        alignItems: Styles.center,
        flexDirection: Styles.row,
    },
    headerText: {
        fontSize: 18,
        lineHeight: 22,
        marginLeft: 20,
        color: Styles.appBackground,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightSemibold,
    },
});

export default styles;
