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
import { fetchMessages , deleteMessage } from "../../store/actions/message";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import Confirm from "components/Modals/Confirm";
import ShowMessage from "components/Modals/ShowMessage";


const  Messages = () => {
  const [confirm, setConfirmModal] = useState(false)
  const [show, setShowModal] = useState(false)

  const [currentPage , setCurrentPage] = useState(1)
  const [id, setId] = useState(null)
  const [msg, setMsg] = useState({})
  const [message, setMessage] = useState("Are You Sure You want to delete this ?")
  const messages = useSelector(state => state.messages)
  const totalMessages = useSelector(state => state.totalMessages)
  const dispatch = useDispatch()

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;

    setMessage("Deleting...")
    dispatch(deleteMessage({ids:[id]})).then(()=>{
      setMessage("Deleted with Success")
      dispatch(fetchMessages({
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
    dispatch(fetchMessages({
      pagination: { page : offset , perPage: 10 },
      sort: { field: 'name' , order: 'ASC' },
      filter: {},
    }))
    setCurrentPage(currentPage)
  }

  useEffect(() => {
     dispatch(fetchMessages())
  }, [dispatch]);
  
  
 const renderMessages = () => {
  if(messages === 0 ){
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
   } else if(messages.length > 0){
      return messages.map((message) => {
        return (
          <tr key={message._id}>
          <th className="align-middle" scope="row">
                <span className="mb-0 text-sm">
                 { message.name}
                </span>
          </th>
          <td className="align-middle" dir="ltr">{ message.phoneNumber }</td>
          {/* <td>{moment(user.createdAt).format('YYYY-MM-DD')}</td> */}
          <td className="align-middle" >
            <div className="d-flex align-items-center">
              <div className="ml-2">
                <Button
                type="button"
                color="danger"
                onClick={() =>  {
                  setId(message._id)
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
                  setMsg(message)
                  setShowModal(c => !c )
                }}
                >
                <i className="fas fa-info-circle ml-2"></i>
                عرض
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
          <td >
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
            <ShowMessage message={msg}  show={show}  toggleShowModal={setShowModal} />

              <Card className="shadow">
                <CardHeader className="d-flex justify-content-end border-0">
                  <h3 className="mb-0">الرسائل</h3>
                </CardHeader>
                <Table dir="rtl" className="text-right" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">الاسم الكامل</th>
                      <th scope="col">رقم الجوال</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                     {renderMessages()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                   <Paginations currentPage={currentPage} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} totalRecords={totalMessages} />
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
        </Container>
      </>
    );
}


export default Messages