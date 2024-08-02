import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 4,
        alignItems: Styles.center,
    },
    headerText: {
        fontSize: 24,
        color: Styles.purple,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
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
