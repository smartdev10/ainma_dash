import { dataProvider } from "../../services/dataProvider";
import { LOAD_MESSAGES , GET_TOTAL_MESSAGES } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const setTotalMessages = (total) => ({
  type: GET_TOTAL_MESSAGES,
  total
})


export const deleteMessage = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "/messages", params)
  };
};

export const fetchMessages = (params = {
  pagination: { page: 0, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "/messages", params).then((res)=>{
      dispatch(loadMessages(res.messages))
      dispatch(setTotalMessages(res.total))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};

export const fetchOneMessage = (params) => {
    return dispatch => {
      return dataProvider("GET_ONE", "/messages", params)
    };
  };

