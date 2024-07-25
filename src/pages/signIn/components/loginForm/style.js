import { StyleSheet } from 'react-native'
import { Styles } from '../../../../constants/constants'

const styles = StyleSheet.create({
    signIn: {
        borderRadius: 5,
        shadowRadius: 10,
        shadowOpacity: 0.7,
        paddingVertical: 10,
        paddingHorizontal: 40,
        alignSelf: Styles.center,
        alignItems: Styles.center,
        shadowColor: Styles.titleColor,
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: Styles.titleColor,
    },
    signInText: {
        fontSize: 18,
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
    field: {
        fontSize: 12,
        marginBottom: 10,
        color: Styles.red,
        fontFamily: Styles.openSans,
    },
})

export default styles
