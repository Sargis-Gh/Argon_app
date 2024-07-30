import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 8,
        columnGap: 8,
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        backgroundColor: Styles.white,
        justifyContent: Styles.spaceBetween,
    },
    itemInfo: {
        rowGap: 4,
        width: '90%',
    },
    title: {
        fontSize: 18,
        color: Styles.articleColor,
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
    loading: {
        height: Styles.fullSize,
        ...Styles.contentCenter,
    },
    showMoreButton: {
        paddingBottom: 16,
        paddingHorizontal: 16,
        alignItems: Styles.center,
        flexDirection: Styles.row,
        justifyContent: Styles.flexEnd,
    },
    showMoreButtonText: {
        color: Styles.grey,
    },
});

export default styles;
