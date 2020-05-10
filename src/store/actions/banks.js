import { dataProvider } from "../../services/dataProvider";
import { LOAD_BANKS , GET_TOTAL_BANKS } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadBanks= banks => ({
    type: LOAD_BANKS,
    banks
});

export const setTotalBanks = (total) => ({
  type: GET_TOTAL_BANKS,
  total
})

export const CreateBank = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "banks", params)
  };
};

export const updateBank = (params) => {
    return dispatch => {
      return dataProvider("UPDATE", "banks", params)
    };
};

export const deleteBank = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "banks", params)
  };
};

export const fetchBanks= (params = {
  pagination: { page: 0, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "banks", params).then((res)=>{
      dispatch(loadBanks(res.banks))
      dispatch(setTotalBanks(res.total))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};

export const fetchOneBank = (params) => {
    return dispatch => {
      return dataProvider("GET_ONE", "banks", params)
    };
  };

