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
import Index from "views/Index";
import Login from "views/pages/Login";
import Messages from "views/pages/Messages";
import Banks from "views/pages/Banks";
import Pages from "views/pages/Pages";
import Places from "views/pages/Places";
import Orders from "views/pages/Orders";
import Products from "views/pages/Products";
import Users from "views/pages/Users";

var routes = [
  {
    path: "/index",
    name: "الصفحة الرئيسية ",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "الأعضاء",
    icon: "ni ni-single-02 text-bleu",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/places",
    name: "المواقع ",
    icon: "ni ni-square-pin text-yellow",
    component: Places,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "المنتجات ",
    icon: "ni ni-bag-17 text-info",
    component: Products,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "الطلبات ",
    icon: "ni ni-delivery-fast text-warning",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/messages",
    name: "الرسائل ",
    icon: "ni ni-chat-round text-success",
    component: Messages,
    layout: "/admin"
  },
  {
    path: "/banks",
    name: "الأبناك ",
    icon: "ni ni-paper-diploma text-info",
    component: Banks,
    layout: "/admin"
  },
  {
    path: "/pages",
    name: "إعدادات أخرى ",
    icon: "ni ni-settings text-info",
    component: Pages,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  }
];
export default routes;
