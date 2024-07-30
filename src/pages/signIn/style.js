import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        height: Styles.fullSize,
    },
    body: {
        borderRadius: 5,
        width: Styles.fullSize,
        alignItems: Styles.center,
        marginTop: Styles.percent20,
        backgroundColor: Styles.white,
    },
    headerContainer: {
        padding: 20,
        paddingTop: 0,
        ...Styles.contentCenter,
    },
    bottomContainer: {
        padding: 20,
        paddingTop: 0,
        borderRadius: 5,
        width: Styles.fullSize,
        alignItems: Styles.center,
        backgroundColor: Styles.bottomContainerColor,
    },
    centerText: {
        lineHeight: 57,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
    signUpWith: {
        margin: 20,
        lineHeight: 17,
        letterSpacing: 0.5,
        color: Styles.grey,
        fontFamily: Styles.openSans,
    },
    buttons: {
        width: Styles.fullSize,
        flexDirection: Styles.row,
        justifyContent: Styles.spaceBetween,
    },
    signInWith: {
        width: 140,
        height: 44,
        elevation: 5,
        borderRadius: 3,
        shadowRadius: 3,
        shadowOpacity: 0.4,
        ...Styles.contentCenter,
        shadowColor: Styles.grey,
        flexDirection: Styles.row,
        backgroundColor: Styles.white,
        shadowOffset: { width: 0, height: 2 },
    },
    headerText: {
        margin: 8,
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: 0.43,
        color: Styles.articleColor,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
});

export default styles;
