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

import AddBankModal from "components/Modals/AddBankModal";
import EditBankModal from "components/Modals/EditBankModal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
import {delay} from "utils/";

// core components
import { useSelector, useDispatch} from "react-redux";
import { fetchBanks , deleteBank } from "../../store/actions/banks";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import Confirm from "components/Modals/Confirm";
import Notification from "components/Modals/Notification";

const  Products = () => {
  
  const [confirm, setConfirmModal] = useState(false)
  const [edit, setEditModal] = useState(false)
  const [addModal, setToggleAddModal] = useState(false)
  const [currentPage , setCurrentPage] = useState(1)
  const [id, setId] = useState(null)
  const [bank, setBank] = useState({})
  const [message, setMessage] = useState("Are You Sure You want to delete this ?")
  const [notify, setNotifyModal] = useState(false)
  const [status, setStatus] = useState("danger")
  const banks = useSelector(state => state.banks)
  const totalBanks = useSelector(state => state.totalBanks)
  const dispatch = useDispatch()

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;

    setMessage("Deleting...")
    dispatch(deleteBank({ids:[id]})).then(()=>{
      setMessage("Deleted with Success")
      dispatch(fetchBanks({
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
      setMessage("Product Not Deleted!!")
    })
  }

  const onPageChanged = (page , totalPages)=>{
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const offset = (currentPage - 1) * 10;
    dispatch(fetchBanks({
      pagination: { page : offset , perPage: 10 },
      sort: { field: 'name' , order: 'ASC' },
      filter: {},
    }))
    setCurrentPage(currentPage)
  }

  useEffect(() => {
     dispatch(fetchBanks())
  }, [dispatch]);
  
  
 const renderBanks= () => {
  if(banks === 0 ){
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
   } else if(banks.length > 0){
      return banks.map((bank) => {
        return (
          <tr  key={bank._id}>
             <td className="align-middle">
              <img style={{ objectFit:"contain" }}  width="30%" className="img-thumbnail" src={`http://54.88.189.39/pics/banks/${bank.picture}`} alt=""/>
             </td>
          <th className="align-middle" scope="row">
                <span className="mb-0 text-sm">
                 { bank.name}
                </span>
          </th>
          <td className="align-middle">{ bank.accountNumber } </td>
          <td className="align-middle">{ bank.ibanNumber }</td>
          {/* <td>{moment(user.createdAt).format('YYYY-MM-DD')}</td> */}
          <td className="align-middle">
            <div className="d-flex align-items-center">
              <div className="ml-2">
                <Button
                type="button"
                color="danger"
                onClick={() =>  {
                  setId(bank._id)
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
                  setBank(bank)
                  setEditModal(c => !c )
                }}
                >
                <i className="fas fa-info-circle ml-2"></i>
                تعديل
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
          <Row dir="rtl">
            <div className="mr-3">
              <Button
                className="mb-3"
                type="button"
                onClick={() => {
                  setToggleAddModal(true) 
                }}
                >
                  <FontAwesomeIcon className="ml-3" icon={faPlusCircle} /> 
                  إضافة بنك
              </Button>
            </div>
          </Row>
          <Row>
            <div className="col">
              <Confirm message={message} id={id} confirm={confirm} confirmAction={deleteAction} toggleConfirmModal={setConfirmModal} />
              <AddBankModal setStatus={setStatus} setMessage={setMessage} currentPage={currentPage} open={addModal} toggleNotifyModal={setNotifyModal} toggleAddBankModal={setToggleAddModal}/>
              <EditBankModal bank={bank} setStatus={setStatus} setMessage={setMessage} currentPage={currentPage} open={edit} toggleNotifyModal={setNotifyModal} toggleEditBankModal={setEditModal}/>
              <Notification  message={message}  status={status} notify={notify}  toggleNotifyModal={setNotifyModal} />
              <Card className="shadow">
                <CardHeader className="d-flex justify-content-end border-0">
                  <h3 className="mb-0"> لائحة الأبناك </h3>
                </CardHeader>
                <Table dir="rtl" className="text-right" responsive>
                  <thead className="thead-light">
                    <tr className="text-right">
                      <th scope="col">الصورة</th>
                      <th scope="col">الاسم</th>
                      <th scope="col">رقم الحساب</th>
                      <th scope="col">رقم الايبان</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                     {renderBanks()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                   <Paginations currentPage={currentPage} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} totalRecords={totalBanks} />
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
        </Container>
      </>
    );
}


export default Products