import { StyleSheet } from 'react-native'
import { AppColors, Fonts, Position } from '../../../../constants/constants'

const styles = StyleSheet.create({
    signIn: {
        borderRadius: 5,
        shadowRadius: 10,
        shadowOpacity: 0.7,
        paddingVertical: 10,
        paddingHorizontal: 40,
        alignSelf: Position.center,
        alignItems: Position.center,
        shadowColor: AppColors.titleColor,
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: AppColors.titleColor,
    },
    signInText: {
        fontSize: 18,
        color: AppColors.white,
        fontFamily: Fonts.openSans,
    },
})

export default styles
