import { StyleSheet, View } from 'react-native'
import { AppColors, Fonts, Position } from '../../../constants/constants'

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: Position.center,
        justifyContent: 'center',
        backgroundColor: AppColors.white,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.openSans,
        color: AppColors.articleColor,
    },
    subtitle: {
        padding: 16,
        fontSize: 15,
        textAlign: Position.center,
        color: AppColors.grey,
        fontFamily: Fonts.openSans,
    }
})

export default styles
