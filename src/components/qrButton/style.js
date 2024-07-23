import { StyleSheet } from 'react-native'
import { AppColors, Position } from '../../constants/constants'

const styles = StyleSheet.create({
    touchable: {
        top: -30,
        alignItems: Position.center,
        justifyContent: Position.center,
    },
    background: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: Position.center,
        justifyContent: Position.center,
        backgroundColor: AppColors.articleColor,
    },
})

export default styles
