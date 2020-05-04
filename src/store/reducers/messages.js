import {  LOAD_MESSAGES , GET_TOTAL_MESSAGES  } from "../actionTypes";

export const messages = (state = 0, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    default:
      return state;
  }
};


export const totalMessages = (state = 0 , action) => {
    switch(action.type){
        case GET_TOTAL_MESSAGES :
         return action.total ;
        default :
         return state; 
    }
  }
