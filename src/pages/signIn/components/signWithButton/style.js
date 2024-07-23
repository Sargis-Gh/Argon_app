import { StyleSheet } from 'react-native'
import { AppColors, Fonts, Position } from '../../../../constants/constants'

const styles = StyleSheet.create({
    backgroundStyle: {
        width: 140,
        height: 44,
        columnGap: 10,
        borderRadius: 3,
        shadowRadius: 3,
        shadowOpacity: 0.4,
        alignItems: Position.center,
        shadowColor: AppColors.grey,
        flexDirection: Position.row,
        justifyContent: Position.center,
        backgroundColor: AppColors.white,
        shadowOffset: { width: 0, height: 2 },
    },
    headerText: {
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: 0.43,
        fontFamily: Fonts.openSans,
        fontWeight: Fonts.weight700,
        color: AppColors.articleColor,
    },
})

export default styles
