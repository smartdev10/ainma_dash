import {  LOAD_PLACES , GET_TOTAL_PLACES  } from "../actionTypes";

export const places = (state = 0, action) => {
  switch (action.type) {
    case LOAD_PLACES:
      return [...action.places];
    default:
      return state;
  }
};


export const totalPlaces = (state = 0 , action) => {
    switch(action.type){
        case GET_TOTAL_PLACES :
         return action.total ;
        default :
         return state; 
    }
  }
