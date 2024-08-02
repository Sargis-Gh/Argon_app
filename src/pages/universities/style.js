import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: 4,
        marginHorizontal: 16,
    },
    headerText: {
        fontSize: 22,
        color: Styles.purple,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
    showMoreButton: {
        paddingBottom: 30,
        paddingHorizontal: 16,
        ...Styles.contentCenter,
        flexDirection: Styles.row,
    },
    showMoreButtonText: {
        color: Styles.grey,
    },
    searchContainer: {
        padding: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: Styles.center,
        flexDirection: Styles.row,
        borderColor: Styles.purpleWithOpacity,
    },
    searchContainerText: {
        width: '90%',
        fontSize: 18,
        marginHorizontal: 4,
        fontFamily: Styles.openSans,
        color: Styles.purpleWithOpacity,
        backgroundColor: Styles.transparent,
    }
});

export default styles;
