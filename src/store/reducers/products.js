import {  LOAD_PRODUCTS ,GET_TOTAL_PRODUCTS } from "../actionTypes";

export const products = (state = 0, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.products];
    default:
      return state;
  }
};


export const totalProducts = (state = 0 , action) => {
  switch(action.type){
      case GET_TOTAL_PRODUCTS :
       return action.total ;
      default :
       return state; 
  }
}