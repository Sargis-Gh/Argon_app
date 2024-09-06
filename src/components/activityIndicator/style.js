import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Styles.contentCenter,
        backgroundColor: Styles.appBackground,
    },
});

export default styles;
