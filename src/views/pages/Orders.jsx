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
import React , { useEffect , useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Button,
  Container,
  Row
} from "reactstrap";

import Loader from 'react-loader-spinner'
import {delay} from "utils/";

// core components
import { useSelector, useDispatch} from "react-redux";
import { fetchOrders , deleteOrder } from "../../store/actions/orders";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import Confirm from "components/Modals/Confirm";


const  Orders = () => {
  const [confirm, setConfirmModal] = useState(false)

  const [currentPage , setCurrentPage] = useState(1)
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("Are You Sure You want to delete this ?")
  const orders = useSelector(state => state.orders)
  const totalOrders = useSelector(state => state.totalOrders)
  const dispatch = useDispatch()

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;

    setMessage("Deleting...")
    dispatch(deleteOrder({ids:[id]})).then(()=>{
      setMessage("Deleted with Success")
      dispatch(fetchOrders({
        pagination: { page : offset , perPage: offset + 10 },
        sort: { field: 'name' , order: 'ASC' },
        filter: {},
      })).then(()=>{
        delay(1000).then(()=>{
          setConfirmModal(false)
          setMessage("Are You Sure You want to delete this ?")
        })
      })
    }).catch((err)=>{
      setMessage("Document Not Deleted!!")
    })
  }

  const onPageChanged = (page , totalPages)=>{
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const offset = (currentPage - 1) * 10;
    dispatch(fetchOrders({
      pagination: { page : offset , perPage: 10 },
      sort: { field: 'name' , order: 'ASC' },
      filter: {},
    }))
    setCurrentPage(currentPage)
  }

  useEffect(() => {
     dispatch(fetchOrders())
  }, [dispatch]);
  
  
 const renderOrders = () => {
  if(orders === 0 ){
    return (
     <tr>
       <td>
       <Loader
           type="TailSpin"
           color="#0E64CA"
           height={30}
           width={30}
         />
       </td>
     </tr>
    )
   } else if(orders.length > 0){
      return orders.map((order) => {
        return (
          <tr key={order._id}>
          <th scope="row">
                <span className="mb-0 text-sm">
                 { order.email}
                </span>
          </th>
          <td>{ order.phone_number }</td>
          {/* <td>{moment(user.createdAt).format('YYYY-MM-DD')}</td> */}
          <td>
            <div className="d-flex align-items-center">
            <div className="mr-2">
              <Button
              type="button"
              color="danger"
              onClick={() =>  {
                setId(order._id)
                setConfirmModal(c => !c )
              }}
              >
              <i className="far fa-trash-alt mr-2"></i>
              حذف
              </Button>
              </div>
              <div className="mr-2">
              <Button
              type="button"
              color="danger"
              onClick={() =>  {
                setId(order._id)
                setConfirmModal(c => !c )
              }}
              >
              <i className="far fa-trash-alt mr-2"></i>
              حذف
              </Button>
              </div>
            </div>
          </td>
          </tr>
        );
      });
    }else{
       return (
        <tr className="mb-0">
          <td className="">
          لا يوجد معلومات
          </td>    
        </tr>
       ) 
    }
   
  };

    return (
      <>
        <Header />
        {/* Page content */}
        <Container  className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Confirm message={message} id={id} confirm={confirm} confirmAction={deleteAction} toggleConfirmModal={setConfirmModal} />
              <Card className="shadow">
                <CardHeader className="d-flex justify-content-end border-0">
                  <h3 className="mb-0">
                    لائحة الطلبات 
                  </h3>
                </CardHeader>
                <Table dir="rtl" className="text-right" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">رقم الطلب</th>
                      <th scope="col">حالة الطلب</th>
                      <th scope="col">تاريخ الطلب</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody className="text-right">
                     {renderOrders()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                   <Paginations currentPage={currentPage} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} totalRecords={totalOrders} />
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
        </Container>
      </>
    );
}


export default Orders