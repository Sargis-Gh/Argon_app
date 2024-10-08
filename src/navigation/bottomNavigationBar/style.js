import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Styles.white,
    },
    touchableContent: {
        width: 70,
        bottom: 30,
        elevation: 2,
        aspectRatio: 1,
        shadowRadius: 4,
        borderRadius: 35,
        shadowOpacity: 1,
        ...Styles.contentCenter,
        shadowColor: Styles.grey,
        backgroundColor: Styles.appBackground,
        shadowOffset: { width: 0, height: 1 },
    },
    tabBarStyle: {
        backgroundColor: Styles.white,
    },
});

export default styles;
