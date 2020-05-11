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
import { fetchUsers , DeleteUser } from "../../store/actions/users";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import Confirm from "components/Modals/Confirm";


const  Users = () => {
  const [confirm, setConfirmModal] = useState(false)

  const [currentPage , setCurrentPage] = useState(1)
  const [id, setId] = useState(null)
  // const [user, setUser] = useState({})
  const [message, setMessage] = useState("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
  const users = useSelector(state => state.users)
  const totalUsers = useSelector(state => state.totalUsers)
  const dispatch = useDispatch()

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;

    setMessage("جاري الحذف....")
    dispatch(DeleteUser({ids:[id]})).then(()=>{
      setMessage("تمت العملية بنجاح !")
      dispatch(fetchUsers({
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
    dispatch(fetchUsers({
      pagination: { page : offset , perPage: 10 },
      sort: { field: 'name' , order: 'ASC' },
      filter: {},
    }))
    setCurrentPage(currentPage)
  }

  useEffect(() => {
     dispatch(fetchUsers())
  }, [dispatch]);
  
  
 const renderUsers = () => {
  if(users === 0 ){
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
   } else if(users.length > 0){
      return users.map((user) => {
        return (
          <tr key={user._id}>
          <th className="align-middle" scope="row">
                <span className="mb-0 text-sm">
                 { user.name}
                </span>
          </th>
          <td className="align-middle">{ user.phoneNumber }</td>
          <td className="align-middle">{ user.email }</td>
          {/* <td>{moment(user.createdAt).format('YYYY-MM-DD')}</td> */}
          <td className="align-middle">
            <div className="d-flex align-items-center">
              <div className="ml-2">
                <Button
                type="button"
                color="danger"
                onClick={() =>  {
                  setId(user._id)
                  setConfirmModal(c => !c )
                }}
                >
                <i className="far fa-trash-alt ml-2"></i>
                حذف
                </Button>
              </div>
              {/* <div className="ml-2">
                <Button
                type="button"
                color="primary"
                onClick={() =>  {
                  setUser(user)
                  setShowModal(c => !c )
                }}
                >
                <i className="fas fa-info-circle ml-2"></i>
                عرض
                </Button>
              </div> */}
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

              <Card className="shadow">
                <CardHeader className="d-flex justify-content-end border-0">
                  <h3 className="mb-0">لائحة الأعضاء </h3>
                </CardHeader>
                <Table dir="rtl" className="text-right" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">الاسم الكامل</th>
                      <th scope="col">رقم الجوال</th>
                      <th scope="col">البريد الإلكتروني</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                     {renderUsers()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                   <Paginations currentPage={currentPage} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} totalRecords={totalUsers} />
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
        </Container>
      </>
    );
}


export default Users