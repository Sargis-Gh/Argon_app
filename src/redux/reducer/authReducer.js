import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../action/auth';

const initialState = {
  isAuthenticated: false,
  error: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, isAuthenticated: true, error: null };
    case SIGN_IN_FAILURE:
      return { ...state, isAuthenticated: false, error: action.payload };
    default:
      return state;
  }
};

export default appReducer;