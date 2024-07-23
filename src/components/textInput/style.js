import { StyleSheet } from 'react-native'
import { AppColors, AppWords, Fonts, Position } from '../../constants/constants'

const styles = StyleSheet.create({
    background: {
        height: 46,
        padding: 6,
        columnGap: 10,
        borderRadius: 3,
        shadowRadius: 3,
        shadowOpacity: 0.4,
        width: Position.fullSize,
        alignItems: Position.center,
        flexDirection: Position.row,
        color: AppColors.textInputGrey,
        backgroundColor: AppColors.white,
        shadowColor: AppColors.textInputGrey,
        shadowOffset: { width: 0, height: 2 },

    },
    textInput: {
        fontSize: 14,
        lineHeight: 19,
        width: Position.percent90,
        height: Position.fullSize,
        fontFamily: Fonts.openSans,
        color: AppColors.textInputGrey,
        backgroundColor: AppColors.white,
    }
})

export default styles
