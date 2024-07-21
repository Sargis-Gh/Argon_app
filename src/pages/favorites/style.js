import { StyleSheet } from "react-native";
import { AppColors, Position } from "../../constants/constants";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: AppColors.grey,
        justifyContent: Position.center,
        alignItems: Position.center,
    }
})

export default styles