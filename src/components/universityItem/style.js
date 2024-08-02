import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    item: {
        rowGap: 8,
        padding: 8,
        elevation: 2,
        borderRadius: 6,
        shadowRadius: 3,
        marginVertical: 8,
        shadowOpacity: 0.3,
        marginHorizontal: 16,
        flexDirection: Styles.row,
        shadowColor: Styles.purple,
        backgroundColor: Styles.white,
        justifyContent: Styles.spaceBetween,
        shadowOffset: { width: 0, height: 1 },
    },
    aboutUnivercity: {
        flex: 3,
        rowGap: 8,
        justifyContent: Styles.spaceBetween
    },
    buttons: {
        flex: 1,
        alignItems: Styles.flexEnd,
        justifyContent: Styles.spaceBetween,
    },
    itemInfo: {
        rowGap: 4,
    },
    viewDetails: {
        color: Styles.purple,
        textAlign: Styles.center,
        fontFamily: Styles.openSans,
    },
    title: {
        fontSize: 18,
        color: Styles.purple,
        fontWeight: Styles.fontWeightBold,
    },
    location: {
        flexDirection: Styles.row,
        alignItems: Styles.center,
    },
    countryName: {
        color: Styles.grey,
    },
    addToFavorites: {
        padding: 4,
        borderLeftWidth: 0.4,
        borderLeftColor: Styles.grey,
    },
});

export default styles;
