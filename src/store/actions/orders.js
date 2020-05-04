import { dataProvider } from "../../services/dataProvider";
import { LOAD_ORDERS , GET_TOTAL_ORDERS } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadOrders = orders => ({
    type: LOAD_ORDERS,
    orders
});

export const setTotalOrders = (total) => ({
  type: GET_TOTAL_ORDERS,
  total
})



export const updateOrder = (params) => {
    return dispatch => {
      return dataProvider("UPDATE", "/orders", params)
    };
};

export const deleteOrder = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "/orders", params)
  };
};

export const fetchOrders = (params = {
  pagination: { page: 0, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "/orders", params).then((res)=>{
      dispatch(loadOrders(res.orders))
      dispatch(setTotalOrders(res.total))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};

export const fetchOneOrder = (params) => {
    return dispatch => {
      return dataProvider("GET_ONE", "/orders", params)
    };
  };

