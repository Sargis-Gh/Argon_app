import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        margin: 8,
        height: 46,
        elevation: 3,
        columnGap: 8,
        borderRadius: 3,
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
        color: Styles.textInputGrey,
        backgroundColor: Styles.white,
    },
});

export default styles;
