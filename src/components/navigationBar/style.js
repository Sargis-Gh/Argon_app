import {StyleSheet} from 'react-native';
import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
  backgroundStyle: {
    height: 25,
    width: Styles.fullSize,
    alignItems: Styles.center,
    flexDirection: Styles.row,
  },
  headerText: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 40,
    color: Styles.white,
    fontFamily: Styles.openSans,
    fontWeight: Styles.fontWeightSemibold,
  },
});

export default styles;
