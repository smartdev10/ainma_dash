import axios from "axios";
import { stringify } from 'query-string';


let  transport = axios.create({
    withCredentials: true,
})

export function dataProvider(type , path , params) {
  let url ='';
  let method ='';
  let data='';
  switch(type){
    case "GET_LIST": {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([
                page,
                perPage,
            ]),
            filter: JSON.stringify(params.filter),
        };
        url = `${path}?${stringify(query)}`;
        method = 'GET';
        break;
    }
    case "GET_ONE":
        url = `${path}/${params.id}`;
        method = 'GET';
        break;
    case "CREATE":
        url = `${path}`;
        method = 'POST';
        data = params.data;
        break;
    case "AUTH":
        url = `${path}`;
        method = 'POST';
        data = params.data;
        break;
    case "LOGOUT": {
        url = `${path}`;
        method = 'POST';
        data = params.data;
        break;
    } 
    case "REFRESHING_TOKEN": {
        url = `${path}`;
        method = 'POST';
        data = params.data;
        break;
    } 
    case "UPDATE":
        url = `${path}/${params.data.id}`;
        method = 'PUT';
        data = params.data;
        break;
    case "DELETE":
        url = `${path}/${params.id}`;
        method = 'DELETE';
        break;
    case "DELETE_MANY":
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        url = `${path}?${stringify(query)}`;
        method = 'DELETE';
        break;
    case "GET_MANY_REFERENCE": {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([
                (page - 1) * perPage,
                page * perPage - 1,
            ]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        url = `${path}?${stringify(query)}`;
        method = 'GET';
        break;
    }
    default:
        throw new Error(`Unsupported Data Provider request type ${type}`);
  }


  return new Promise((resolve, reject) => {
    return transport[method.toLowerCase()](`/api/${url}`, data)
      .then(res => {
        // console.log(res.data)
        return resolve(res.data);
      })
      .catch(err => {
        if (!err.status) {
            return reject("Network error");
          }
        return reject(err.response);
      });
  });
}
