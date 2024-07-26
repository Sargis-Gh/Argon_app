import { StyleSheet } from "react-native";
import { Styles } from "../../constants/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 8,
        ...Styles.contentCenter,
    },
    headerText: {
        fontSize: 20,
        color: Styles.articleColor,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightBold,
    },
    item: {
        padding: 8,
        columnGap: 8,
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: Styles.row,
        alignItems: Styles.center,
        backgroundColor: Styles.white,
        justifyContent: Styles.spaceBetween,
    },
    itemInfo: {
        rowGap: 4,
        width: '90%',
    },
    title: {
        fontSize: 18,
        color: Styles.articleColor,
        fontWeight: Styles.fontWeightBold,
    },
    location: {
        flexDirection: Styles.row,
        alignItems: Styles.center,
    },
    countryName: {
        color: Styles.grey
    },
    addToFavorites: {
        padding: 4,
        borderLeftWidth: 0.4,
        borderLeftColor: Styles.grey,
    }
})

export default styles