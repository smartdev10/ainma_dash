import { dataProvider } from "../../services/dataProvider";
import { LOAD_USERS ,GET_TOTAL_USERS } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadUsers = users => ({
    type: LOAD_USERS,
    users
});
export const setTotalUsers = (total) => ({
  type: GET_TOTAL_USERS,
  total
})

export const CreateUser = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "users", params)
  };
};

export const DeleteUser = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "users", params)
  };
};

export const fetchUsers = (params = {
  pagination: { page: 0, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "users", params).then((res)=>{
      dispatch(loadUsers(res.users))
      dispatch(setTotalUsers(res.total))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};


export const fetchOneUser = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "users", params)
  };
};