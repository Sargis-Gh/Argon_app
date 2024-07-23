import { StyleSheet } from "react-native";
import { AppColors, Fonts, Position } from "../../../../constants/constants";

const styles = StyleSheet.create({
    background: {
        rowGap: 10,
        paddingBottom: 20,
        alignItems: Position.center,
        justifyContent: Position.center,
        backgroundColor: AppColors.white,
    },
    getStarted: {
        width: '70%',
        borderRadius: 10,
        shadowRadius: 10,
        shadowOpacity: 0.7,
        paddingVertical: 10,
        alignItems: Position.center,
        shadowColor: AppColors.titleColor,
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: AppColors.titleColor,
    },
    getStartedText: {
        fontSize: 18,
        color: AppColors.white,
        fontFamily: Fonts.openSans,
    },
    closeText: {
        fontSize: 18,
        fontFamily: Fonts.openSans,
        color: AppColors.titleColor,
    },
})

export default styles