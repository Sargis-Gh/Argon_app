import { StyleSheet } from 'react-native'
import { AppColors, Fonts, Position } from '../../../../constants/constants'

const styles = StyleSheet.create({
    background: {
        columnGap: 8,
        alignItems: Position.center,
        flexDirection: Position.row,
    },
    field: {
        fontSize: 12,
        color: AppColors.red,
        fontFamily: Fonts.openSans,
    },
})

export default styles
