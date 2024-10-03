import { StyleSheet } from 'react-native';

import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: Styles.center,
        backgroundColor: Styles.white,
    },
    renderLoadingContent: {
        flex: 1,
        ...Styles.contentCenter,
        backgroundColor: Styles.white,
    },
});

export default styles;
