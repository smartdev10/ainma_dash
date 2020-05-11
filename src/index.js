/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import Cookies from 'universal-cookie';

import {  setCurrentUser , userLogout } from "./store/actions/user_auth";
import { configureStore } from "./store"
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/css/style.css";
// import "assets/css/fontawesome.min.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import App from "App";

const cookies = new Cookies();
const store = configureStore();
if (cookies.get('ainma_access')) {

  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(cookies.get('ainma_access'))));
  } catch (e) {
    store.dispatch(userLogout({data:{userId:localStorage.getItem("uuid")}}))
    .then((res)=>{
      store.dispatch(setCurrentUser({}));
    })
  }
}else{
 if(localStorage.getItem("uuid")){
  store.dispatch(userLogout({data:{userId:localStorage.getItem("uuid")}}))
  .then((res)=>{
    store.dispatch(setCurrentUser({}));
    localStorage.clear()
  })
 }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
