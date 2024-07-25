import { StyleSheet } from 'react-native';
import { Styles } from '../../constants/constants';

const styles = StyleSheet.create({
  background: {
    padding: 30,
    height: Styles.fullSize,
  },
  body: {
    borderRadius: 5,
    width: Styles.fullSize,
    alignItems: Styles.center,
    marginTop: Styles.percent20,
    backgroundColor: Styles.white,
  },
  headerContainer: {
    padding: 20,
    paddingTop: 0,
    alignItems: Styles.center,
    justifyContent: Styles.center,
  },
  bottomContainer: {
    padding: 20,
    paddingTop: 0,
    borderRadius: 5,
    width: Styles.fullSize,
    alignItems: Styles.center,
    backgroundColor: Styles.bottomContainerColor,
  },
  loginForm: {},
  centerText: {
    Stylesize: 55,
    lineHeight: 57,
    color: Styles.white,
    fontFamily: Styles.openSans,
    fontWeight: Styles.weight700,
  },
  signUpWith: {
    margin: 20,
    Stylesize: 12,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: Styles.grey,
    fontFamily: Styles.openSans,
  },
  buttons: {
    width: Styles.fullSize,
    flexDirection: Styles.row,
    justifyContent: Styles.spaceBetween,
  },
  signInWith: {
    width: 140,
    height: 44,
    borderRadius: 3,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    alignItems: Styles.center,
    shadowColor: Styles.grey,
    flexDirection: Styles.row,
    justifyContent: Styles.center,
    backgroundColor: Styles.white,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    margin: 10,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.43,
    fontFamily: Styles.openSans,
    fontWeight: Styles.weight700,
    color: Styles.articleColor,
  },
});

export default styles;
