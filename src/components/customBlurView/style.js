import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
        position: Styles.absolute,
        backgroundColor: Styles.blackWithOpacity,
    },
});

export default styles;
