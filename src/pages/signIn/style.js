import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        ...Styles.contentCenter,
        height: Styles.fullSize,
        backgroundColor: Styles.appBackground,
    },
    body: {
        borderRadius: 10,
        width: Styles.fullSize,
        alignItems: Styles.center,
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
        elevation: 8,
        borderRadius: 3,
        shadowRadius: 3,
        shadowOpacity: 0.2,
        ...Styles.contentCenter,
        flexDirection: Styles.row,
        backgroundColor: Styles.white,
        shadowColor: Styles.appBackground,
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
