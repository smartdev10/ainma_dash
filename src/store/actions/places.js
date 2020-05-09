import { dataProvider } from "../../services/dataProvider";
import { LOAD_PLACES , GET_TOTAL_PLACES } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadPlaces = places => ({
    type: LOAD_PLACES,
    places
});

export const setTotalPlaces = (total) => ({
  type: GET_TOTAL_PLACES,
  total
})

export const CreatePlace = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "places", params)
  };
};

export const updatePlace = (params) => {
    return dispatch => {
      return dataProvider("UPDATE", "places", params)
    };
};

export const deletePlace = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "places", params)
  };
};

export const fetchPlaces = (params = {
  pagination: { page: 0, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "places", params).then((res)=>{
      dispatch(loadPlaces(res.places))
      dispatch(setTotalPlaces(res.total))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};

export const fetchOnePlace = (params) => {
    return dispatch => {
      return dataProvider("GET_ONE", "places", params)
    };
};

