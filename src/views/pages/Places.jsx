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
import AddPlaceModal from "components/Modals/AddPlaceModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
import {delay} from "utils/";

// core components
import { useSelector, useDispatch} from "react-redux";
import { fetchPlaces , deletePlace } from "../../store/actions/places";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import Confirm from "components/Modals/Confirm";


const  Places = () => {

  const [confirm, setConfirmModal] = useState(false)
  const [addModal, setToggleAddModal] = useState(false)

  const [currentPage , setCurrentPage] = useState(1)
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("Are You Sure You want to delete this ?")
  const places = useSelector(state => state.places)
  const totalPlaces = useSelector(state => state.totalPlaces)
  const dispatch = useDispatch()

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;

    setMessage("Deleting...")
    dispatch(deletePlace({ids:[id]})).then(()=>{
      setMessage("Deleted with Success")
      dispatch(fetchPlaces({
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
    dispatch(fetchPlaces({
      pagination: { page : offset , perPage: 10 },
      sort: { field: 'name' , order: 'ASC' },
      filter: {},
    }))
    setCurrentPage(currentPage)
  }

  useEffect(() => {
     dispatch(fetchPlaces())
  }, [dispatch]);
  
  
 const renderPlaces= () => {
  if(places === 0 ){
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
   } else if(places.length > 0){
      return places.map((user) => {
        return (
          <tr key={user._id}>
          <th scope="row">
                <span className="mb-0 text-sm">
                 { user.email}
                </span>
          </th>
          <td>{ user.phone_number }</td>
          {/* <td>{moment(user.createdAt).format('YYYY-MM-DD')}</td> */}
          <td>
            <div className="d-flex align-items-center">
              <div className="mr-2">
                <Button
                type="button"
                color="danger"
                onClick={() =>  {
                  setId(user._id)
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
                  setId(user._id)
                  setConfirmModal(c => !c )
                }}
                >
                <i className="far fa-trash-alt mr-2"></i>
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
                إضافة موقع
              </Button>
            </div>
          </Row>
          <Row>
            <div className="col">
            <AddPlaceModal currentPage={currentPage} open={addModal} toggleAddPlaceModal={setToggleAddModal}/>
            <Confirm message={message} id={id} confirm={confirm} confirmAction={deleteAction} toggleConfirmModal={setConfirmModal} />
              <Card className="shadow">
                 <CardHeader className="d-flex justify-content-end border-0">
                  <h3 className="mb-0">
                    لائحة المواقع 
                  </h3>
                </CardHeader>
                <Table dir="rtl" className="text-right" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">اسم الموقع</th>
                      <th scope="col">نوع الموقع</th>
                      <th scope="col">إحداثيات الموقع</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                     {renderPlaces()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                   <Paginations currentPage={currentPage} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} totalRecords={totalPlaces} />
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
        </Container>
      </>
    );
}


export default Places