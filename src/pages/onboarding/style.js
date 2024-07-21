import { StyleSheet } from 'react-native'
import { AppColors, Position } from '../../constants/constants'

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: Position.center,
        justifyContent: Position.center,
        backgroundColor: AppColors.articleColor,
    },
})

export default styles
