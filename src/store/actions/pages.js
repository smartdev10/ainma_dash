import { dataProvider } from "../../services/dataProvider";
import { LOAD_PAGES , GET_TOTAL_PAGES } from "../actionTypes";
import {handleTokenErrors} from '../../services/errorHandlers'


export const loadPages = documents => ({
    type: LOAD_PAGES,
    documents
});

export const setTotalPages = (total) => ({
  type: GET_TOTAL_PAGES,
  total
})

export const CreatePage = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "pages", params)
  };
};

export const UploadSokia = (params) => {
  return dispatch => {
    return dataProvider("CREATE", "images/sokia", params)
  };
};

export const deleteSokia = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "images", params)
  };
};

export const fetchOneImage = (params) => {
  return dispatch => {
    return dataProvider("GET_ONE", "images", params)
  };
};

export const updatePage = (params) => {
    return dispatch => {
      return dataProvider("UPDATE", "pages", params)
    };
};

export const deletePage = (params) => {
  return dispatch => {
    return dataProvider("DELETE_MANY", "pages", params)
  };
};

export const fetchPages = (params = {
  pagination: { page: 0, perPage: 10 },
  sort: { field: 'name' , order: 'ASC' },
  filter: {},
}) => {
  return dispatch => {
    return dataProvider("GET_LIST", "pages", params).then((res)=>{
      dispatch(loadPages(res.pages))
      dispatch(setTotalPages(res.total))
    }).catch(err => {
      handleTokenErrors(err)
    });
  };
};

export const fetchOnePage = (params) => {
    return dispatch => {
      return dataProvider("GET_ONE", "pages", params)
    };
  };

