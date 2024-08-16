import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        ...Styles.contentCenter,
        backgroundColor: Styles.purple,
    },
});

export default styles;
