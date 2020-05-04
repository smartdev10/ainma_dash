import { dataProvider } from "../../services/dataProvider";
import { SET_CURRENT_USER , LOGIN_FAILURE } from "../actionTypes";





export const user_signin= (params) => {
  return dispatch => {
    return dataProvider("AUTH", "auth/admins/signin", params)
  };
};


export function refreshToken(params) {
  return dispatch => {
    return dataProvider("REFRESHING_TOKEN", "auth/admins/refreshToken", params)
  };
}

export function userLogout(params) {
  return dispatch => {
    return dataProvider("LOGOUT", "auth/admins/signout", params)
  };
}


export function logginError() {
  return {
    type: LOGIN_FAILURE
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
