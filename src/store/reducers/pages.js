import {  LOAD_PAGES , GET_TOTAL_PAGES  } from "../actionTypes";

export const pages = (state = 0, action) => {
  switch (action.type) {
    case LOAD_PAGES:
      return [...action.documents];
    default:
      return state;
  }
};


export const totalPages = (state = 0 , action) => {
    switch(action.type){
        case GET_TOTAL_PAGES :
         return action.total ;
        default :
         return state; 
    }
  }
