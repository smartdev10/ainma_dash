 import { LOAD_USERS, GET_TOTAL_USERS } from "../actionTypes";

export const users = (state = 0, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return [...action.users];
    default:
      return state;
  }
};

export const totalUsers = (state = 0 , action) => {
  switch(action.type){
      case GET_TOTAL_USERS :
       return action.total ;
      default :
       return state; 
  }
}