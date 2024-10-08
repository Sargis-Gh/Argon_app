import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        height: 40,
        elevation: 3,
        columnGap: 8,
        borderRadius: 4,
        shadowRadius: 3,
        shadowOpacity: 0.4,
        paddingHorizontal: 8,
        width: Styles.fullSize,
        alignItems: Styles.center,
        flexDirection: Styles.row,
        color: Styles.textInputGrey,
        backgroundColor: Styles.white,
        shadowColor: Styles.textInputGrey,
        shadowOffset: { width: 0, height: 2 },
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        lineHeight: 19,
        height: Styles.fullSize,
        fontFamily: Styles.openSans,
        color: Styles.appBackground,
        backgroundColor: Styles.white,
        fontWeight: Styles.fontWeightRegular,
    },
});

export default styles;
