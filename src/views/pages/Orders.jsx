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
import { fetchOrders , deleteOrder , updateOrder } from "../../store/actions/orders";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import Confirm from "components/Modals/Confirm";
import ShowModal from "components/Modals/ShowModal";
import Notification from "components/Modals/Notification";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const  Orders = () => {
  const [confirm, setConfirmModal] = useState(false)
  const [show, setShowModal] = useState(false)
  const [notify, setNotifyModal] = useState(false)
  const [currentPage , setCurrentPage] = useState(1)
  const [id, setId] = useState(null)
  const [order, setOrder] = useState({})
  const [message, setMessage] = useState("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
  const [status, setStatus] = useState("danger")
  const orders = useSelector(state => state.orders)
  const totalOrders = useSelector(state => state.totalOrders)
  const dispatch = useDispatch()

  const updatedStatus = (data) => {
    dispatch(updateOrder(data)).then(()=>{
      dispatch(fetchOrders()).then(()=>{
        setStatus("success")
        setMessage(`تم تحديث حالة الطلب`)
        setNotifyModal(true)
        delay(2000).then(()=>{
          setNotifyModal(false)
          setMessage("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
        })
      })
    }).catch((err)=>{
        setStatus("danger")
        setMessage(`  لم تتم العملية بنجاح !`)
        setNotifyModal(true)
    })
  }

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;
    setMessage("جاري الحذف....")
    dispatch(deleteOrder({ids:[id]})).then(()=>{
      setMessage("تمت العملية بنجاح !")
      dispatch(fetchOrders({
        pagination: { page : offset , perPage: offset + 10 },
        sort: { field: 'name' , order: 'ASC' },
        filter: {},
      })).then(()=>{
        delay(1000).then(()=>{
          setConfirmModal(false)
          setMessage("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
        })
      })
    }).catch((err)=>{
      setMessage("  لم تتم العملية بنجاح !")
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
          <th className="align-middle" scope="row">
                <span className="mb-0 text-sm">
                 { order.number}
                </span>
          </th>
          <td className="align-middle">{ order.user.name }</td>
          <td className="align-middle">{ order.totalPrice ? order.totalPrice : "غير وارد"  }</td>
          <td className="align-middle">{ order.gift_sender  ? order.gift_sender : "غير وارد"  }</td>
          <td className="align-middle">{ order.gift_receiver  ? order.gift_receiver : "غير وارد"  }</td>
          <td className="align-middle">{ order.gift_receiver_phone_number   ? order.gift_receiver_phone_number : "غير وارد" }</td>
          {/* <td>{moment(user.createdAt).format('YYYY-MM-DD')}</td> */}
          <td>
          <BootstrapSwitchButton
            checked={order.status === "done" ? true : order.status === "process" ? false : false}
            onlabel='تم تسليم الطلب'
            onstyle='success'
            offlabel='تم استلام الطلب'
            offstyle='info'
            size="sm"
            width={150}
            onChange={(checked) => {
              console.log(checked)
              let status;
              checked ? status="done" : status ="process"
              updatedStatus({ 
                 id:order._id,
                 data:{
                  status
                 }
              })
            }}
        />
          </td>
          <td className="align-middle">
            <div className="d-flex align-items-center">
              <div className="ml-2">
                <Button
                type="button"
                color="danger"
                onClick={() =>  {
                  setId(order._id)
                  setConfirmModal(c => !c )
                }}
                >
                <i className="far fa-trash-alt ml-2"></i>
                حذف
                </Button>
              </div>
              <div className="ml-2">
                <Button
                type="button"
                color="primary"
                onClick={() =>  {
                  setOrder(order)
                  setShowModal(c => !c )
                }}
                >
                <i className="fas fa-info-circle ml-2"></i>
                تفاصيل الطلب
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
              <Notification  message={message}  status={status} notify={notify}  toggleNotifyModal={setNotifyModal} />
              <ShowModal message={message} order={order} show={show}  toggleShowModal={setShowModal} />
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
                      <th scope="col">صاحب الطلب</th>
                      <th scope="col">المبلغ الإجمالي</th>
                      <th scope="col">المهدي</th>
                      <th scope="col">المهدى إليه</th>
                      <th scope="col">جوال المهدى إليه</th>
                      <th scope="col">حالة الطلب</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody >
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