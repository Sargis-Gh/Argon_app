import {StyleSheet} from 'react-native';
import { AppColors, Fonts, Position } from '../../constants/constants';

const styles = StyleSheet.create({
  background: {
    rowGap: 70,
    padding: 30,
    height: Position.fullSize,
  },
  body: {
    borderRadius: 5,
    width: Position.fullSize,
    alignItems: Position.center,
    backgroundColor: AppColors.white,
  },
  headerContainer: {
    rowGap: 25,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    alignItems: Position.center,
    justifyContent: Position.center,
  },
  bottomContainer: {
    rowGap: 20,
    padding: 20,
    paddingTop: 30,
    borderRadius: 5,
    width: Position.fullSize,
    alignItems: Position.center,
    backgroundColor: AppColors.bottomContainerColor,
  },
  loginForm: {
    rowGap: 20,
  },
  centerText: {
    fontSize: 55,
    lineHeight: 57,
    color: AppColors.white,
    fontFamily: Fonts.openSans,
    fontWeight: Fonts.weight700,
  },
  signUpWith: {
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.37,
    color: AppColors.grey,
    fontFamily: Fonts.openSans,
  },
  buttons: {
    width: Position.fullSize,
    flexDirection: Position.row,
    justifyContent: Position.spaceBetween,
  }
});

export default styles;
