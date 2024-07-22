import { StyleSheet } from "react-native";
import { AppColors, Fonts, Position } from "../../../../constants/constants";

const styles = StyleSheet.create({
    background: {
        alignItems: Position.center,
        justifyContent: Position.center,
        rowGap: 10,
        backgroundColor: AppColors.white,
        paddingBottom: 20,
    },
    getStarted: {
        backgroundColor: AppColors.titleColor,
        borderRadius: 10,
        width: '70%',
        alignItems: Position.center,
        paddingVertical: 10,
        shadowRadius: 10,
        shadowOpacity: 0.7,
        shadowColor: AppColors.titleColor,
        shadowOffset: { width: 0, height: 3 },
    },
    getStartedText: {
        color: AppColors.white,
        fontFamily: Fonts.openSans,
        fontSize: 18,
    },
    closeText: {
        color: AppColors.titleColor,
        fontFamily: Fonts.openSans,
        fontSize: 18,
    },
})

export default styles