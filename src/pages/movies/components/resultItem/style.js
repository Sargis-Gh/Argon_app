import { StyleSheet } from 'react-native';

import { Styles } from '../../../../constants/constants';

const styles = StyleSheet.create({
    resultItem: {
        columnGap: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        width: Styles.fullSize,
        flexDirection: Styles.row,
        borderBottomColor: Styles.greyWithOpacity,
    },
    resultItemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    resultItemDetails: {
        flex: 1,
        rowGap: 8,
    },
    resultItemText: {
        fontSize: 16,
        color: Styles.white,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
    },
    releaseDate: {
        fontSize: 12,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
});

export default styles;
