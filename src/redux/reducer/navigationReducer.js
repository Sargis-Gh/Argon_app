import { PageName } from '../../constants/constants';
import { NAVIGATE_TO_HOME } from '../action/navigate';

const initialState = {
  currentRoute: PageName.sign,
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
    case NAVIGATE_TO_HOME:
      return {
        ...state,
        currentRoute: PageName.drawer,
      };
    default:
      return state;
  }
};

export default navigationReducer;