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
// reactstrap components
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from "reactstrap";

// core components


import Header from "components/Headers/Header.jsx";

const Index = () => {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container dir="rtl" className="mt--7">
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0 text-right" xl="8">
              <Jumbotron>
                <h1 className="display-3">مرحبا في داشبورد إرواء و إنماء</h1>
               
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default Index;
