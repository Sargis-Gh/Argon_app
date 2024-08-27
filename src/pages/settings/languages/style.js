import { StyleSheet } from 'react-native';

import { Styles } from '../../../constants/constants';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: Styles.fullSize,
        backgroundColor: Styles.white,
    },
    header: {
        color: Styles.white,
    },
    headerText: {
        fontSize: 18,
        lineHeight: 19,
        marginBottom: 16,
        color: Styles.black,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightSemibold,
    },
    buttons: {
        padding: 4,
        flexDirection: Styles.row,
    },
    languageButtonContainer: {
        rowGap: 16,
    },
    languageButtonContent: {
        width: Styles.fullSize,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        justifyContent: Styles.spaceBetween,
    },
    languageButton: {
        alignItems: Styles.center,
        flexDirection: Styles.row,
        backgroundColor: Styles.white,
    },
    languageButtonText: {
        marginLeft: 8,
        color: Styles.appBackground,
        fontFamily: Styles.openSans,
    },
    checked: {
        width: 12,
        aspectRatio: 1,
        borderRadius: 6,
        backgroundColor: Styles.blue,
    },
});

export default styles;
