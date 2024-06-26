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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import  { userLogout , setCurrentUser } from "../../store/actions/user_auth";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {

  logout = (e) => {
    e.preventDefault()
    let {dispatch  , history } = this.props
       dispatch(userLogout({data:{userId:localStorage.getItem("uuid")}}))
        .then((res)=>{
        localStorage.clear();
        dispatch(setCurrentUser({}));
        history.push('/auth/login');
        localStorage.clear()
       })
   
   }
  render() {
    let { user } = this.props
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/iconfinder_user_male2_172626.png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {user.username}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow">
                  <DropdownItem className="noti-title text-right" header tag="div">
                    <h6 className="text-overflow m-0">مرحبا</h6>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem dir="rtl" className="text-right float-right"  href="#logout" onClick={this.logout}>
                    <i className="ni ni-user-run" /> 
                    <span> تسجيل الخروج </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">
              {this.props.brandText}
            </Link>
          </Container>
        </Navbar>
      </>
    );
  }
}


function mapStateToProps(state) {
  return { 
      user: state.auth.user
   };
}

export default withRouter(
  connect(mapStateToProps)(AdminNavbar)
 );

