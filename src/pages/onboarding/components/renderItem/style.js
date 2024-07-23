import { StyleSheet } from 'react-native'
import { AppColors, Fonts, Position } from '../../../../constants/constants'

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: Position.center,
        justifyContent: Position.center,
        backgroundColor: AppColors.white,
    },
    image: {
        width: Position.fullSize,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.openSans,
        color: AppColors.articleColor,
    },
    subtitle: {
        padding: 16,
        fontSize: 15,
        color: AppColors.grey,
        fontFamily: Fonts.openSans,
        textAlign: Position.center,
    },
})

export default styles
