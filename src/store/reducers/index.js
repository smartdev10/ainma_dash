import { combineReducers } from "redux";
import {users ,totalUsers} from "./users";
import {messages, totalMessages} from "./messages";
import {places, totalPlaces} from "./places";
import {orders, totalOrders} from "./orders";
import {products , totalProducts} from "./products";
import {loading} from "./isloading";
import {fetching} from "./isFetchingToken";
import {loggingout} from "./isLoggingOut"
import {auth} from "./auth";

const rootReducer = combineReducers({
  users,
  messages,
  places,
  orders,
  products,

  totalProducts,
  totalMessages,
  totalUsers,
  totalPlaces,
  totalOrders,
  
  loading,
  fetching,
  loggingout,
  auth
});

export default rootReducer;