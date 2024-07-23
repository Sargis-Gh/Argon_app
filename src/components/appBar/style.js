import {StyleSheet} from 'react-native';
import { AppColors, Fonts, Position } from '../../constants/constants';

const styles = StyleSheet.create({
  backgroundStyle: {
    height: 25,
    columnGap: 40,
    width: Position.fullSize,
    alignItems: Position.center,
    flexDirection: Position.row,
  },
  headerText: {
    fontSize: 16,
    lineHeight: 22,
    color: AppColors.white,
    fontFamily: Fonts.openSans,
    fontWeight: Fonts.weight700,
  },
});

export default styles;
