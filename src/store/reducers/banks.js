import {  LOAD_BANKS ,GET_TOTAL_BANKS } from "../actionTypes";

export const banks = (state = 0, action) => {
  switch (action.type) {
    case LOAD_BANKS:
      return [...action.banks];
    default:
      return state;
  }
};


export const totalBanks = (state = 0 , action) => {
  switch(action.type){
      case GET_TOTAL_BANKS :
       return action.total ;
      default :
       return state; 
  }
}