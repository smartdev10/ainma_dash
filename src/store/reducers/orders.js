import {  LOAD_ORDERS , GET_TOTAL_ORDERS  } from "../actionTypes";

export const orders = (state = 0, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return [...action.orders];
    default:
      return state;
  }
};


export const totalOrders = (state = 0 , action) => {
    switch(action.type){
        case GET_TOTAL_ORDERS :
         return action.total ;
        default :
         return state; 
    }
  }
