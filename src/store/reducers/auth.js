import { SET_CURRENT_USER , LOGIN_FAILURE } from "../actionTypes";


const DEFAULT_STATE = {
  isAuthenticated: false,
  loginError : false,// hopefully be true, when logged in
  user: {} // all the user info when logged in
};


export const auth = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // turn empty object into false or if there are keys, true
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    case LOGIN_FAILURE:
        return {
          ...state,
          loginError: !state.loginError
        };
    default:
      return state;
  }
};
