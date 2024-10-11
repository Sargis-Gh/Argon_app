import { StyleSheet } from 'react-native';

import { DEVICE_SETTINGS, Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    movieContainer: (isMovie) => ({
        marginTop: 4,
        elevation: 4,
        shadowRadius: 2,
        marginRight: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowOpacity: 0.2,
        shadowColor: Styles.white,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: Styles.lightBackground,
        width:
            (isMovie && (DEVICE_SETTINGS.windowWidth - 48) / 2) ||
            DEVICE_SETTINGS.windowWidth / 2.5, // Subtract 48px (16px padding + 16px gap) from window width
    }),
    image: {
        padding: 8,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: Styles.flexEnd,
        justifyContent: Styles.spaceBetween,
        height: (DEVICE_SETTINGS.windowWidth - 48) * 0.6, // Subtract 48 (16 padding + 16 gap) from window width
    },
    movieTitle: {
        fontSize: 15,
        color: Styles.white,
        textAlign: Styles.center,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        fontFamily: Styles.openSans,
        fontWeight: Styles.fontWeightMedium,
        backgroundColor: Styles.lightBackground,
    },
    movieDetails: {
        flex: 1,
        padding: 8,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: Styles.lightBackground,
    },
    ratingContainer: {
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 8,
        ...Styles.contentCenter,
        flexDirection: Styles.row,
        alignSelf: Styles.flexStart,
        backgroundColor: Styles.lightBackground,
    },
    ratingText: {
        color: Styles.white,
        fontFamily: Styles.openSans,
    },
});

export default styles;
