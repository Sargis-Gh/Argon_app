import { StyleSheet } from 'react-native'

import {  Styles } from '../../constants/constants'

const styles = StyleSheet.create({
    background: {
        height: 46,
        padding: 4,
        borderRadius: 3,
        shadowRadius: 3,
        marginBottom: 20,
        shadowOpacity: 0.4,
        width: Styles.fullSize,
        alignItems: Styles.center,
        flexDirection: Styles.row,
        color: Styles.textInputGrey,
        backgroundColor: Styles.white,
        shadowColor: Styles.textInputGrey,
        shadowOffset: { width: 0, height: 2 },
    },
    textInput: {
        width: '90%',
        fontSize: 14,
        lineHeight: 19,
        marginLeft: 10,
        height: Styles.fullSize,
        fontFamily: Styles.openSans,
        color: Styles.textInputGrey,
        backgroundColor: Styles.white,
    }
})

export default styles
