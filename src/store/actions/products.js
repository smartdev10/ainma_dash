import { dataProvider } from "../../services/dataProvider";
import { LOAD_PRODUCTS , GET_TOTAL_PRODUCTS } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadProducts = products => ({
    type: LOAD_PRODUCTS,
    products
});

export const setTotalProducts = (total) => ({
  type: GET_TOTAL_PRODUCTS,
  total
})

export const CreateProduct = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "/products", params)
  };
};

export const updateProduct = (params) => {
    return dispatch => {
      return dataProvider("UPDATE", "/products", params)
    };
};

export const deleteProduct = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "/products", params)
  };
};

export const fetchProducts = (params = {
  pagination: { page: 0, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "/products", params).then((res)=>{
      dispatch(loadProducts(res.products))
      dispatch(setTotalProducts(res.total))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};

export const fetchOneproduct = (params) => {
    return dispatch => {
      return dataProvider("GET_ONE", "/products", params)
    };
  };

