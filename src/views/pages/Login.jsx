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
import React , {useState} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  UncontrolledAlert
} from "reactstrap";

import jwtDecode from "jwt-decode";
import Cookies from 'universal-cookie';
 import { Redirect , useHistory} from "react-router-dom";
import { connect } from "react-redux";
import  {  user_signin , setCurrentUser , logginError   } from "../../store/actions/user_auth";

const cookies = new Cookies();

const Login = (props) => {
  const history = useHistory()
  const [loading,setLoading] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    const { dispatch } = props;
    let username =  e.target.username.value
    let password =  e.target.password.value
    setLoading(true)
    dispatch(user_signin({data:{username , password}}))
    .then(({successMessage})=>{
        setLoading(false)
        dispatch(setCurrentUser(jwtDecode(cookies.get('ainma_access'))))
        localStorage.setItem("uuid",jwtDecode(cookies.get('ainma_access')).id)
        history.push('/admin/index')
      }).catch((err)=>{
          setLoading(false)
          dispatch(logginError())
      })
  }

    const { isAuthenticated, loginError  } = props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }else {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {loginError && (
            <UncontrolledAlert className="m-2 text-center" color="danger" fade={false}>
              <span className="alert-inner--text">
              كلمة السر او اسم الحساب غير صحيح
              </span>
            </UncontrolledAlert>
            )}
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleSubmit} role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input dir="rtl" placeholder="اسم الحساب" name="username" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input dir="rtl"  placeholder="كلمة السر" name="password" type="password" />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    {/* <span className="text-muted">Remember me</span> */}
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                  {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
    }
}

function mapStateToProps(state) {
  return { 
      isAuthenticated: state.auth.isAuthenticated ,
      loginError : state.auth.loginError
   };
}
export default connect(mapStateToProps)(Login);