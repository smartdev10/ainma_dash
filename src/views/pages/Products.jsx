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

import AddProductModal from "components/Modals/AddProductModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
import {delay} from "utils/";

// core components
import { useSelector, useDispatch} from "react-redux";
import { fetchProducts , deleteProduct } from "../../store/actions/products";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import Confirm from "components/Modals/Confirm";
import Notification from "components/Modals/Notification";
import EditProductModal from "components/Modals/EditProductModal";

const  Products = () => {
  
  const [confirm, setConfirmModal] = useState(false)
  const [edit, setEditModal] = useState(false)
  const [addModal, setToggleAddModal] = useState(false)
  const [currentPage , setCurrentPage] = useState(1)
  const [id, setId] = useState(null)
  const [product, setProduct] = useState({})
  const [message, setMessage] = useState("Are You Sure You want to delete this ?")
  const [notify, setNotifyModal] = useState(false)
  const [status, setStatus] = useState("danger")
  const products = useSelector(state => state.products)
  const totalProducts = useSelector(state => state.totalProducts)
  const dispatch = useDispatch()

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;

    setMessage("Deleting...")
    dispatch(deleteProduct({ids:[id]})).then(()=>{
      setMessage("Deleted with Success")
      dispatch(fetchProducts({
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
    dispatch(fetchProducts({
      pagination: { page : offset , perPage: 10 },
      sort: { field: 'name' , order: 'ASC' },
      filter: {},
    }))
    setCurrentPage(currentPage)
  }

  useEffect(() => {
     dispatch(fetchProducts())
  }, [dispatch]);
  
  
 const renderProducts = () => {
  if(products === 0 ){
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
   } else if(products.length > 0){
      return products.map((product) => {
        return (
          <tr key={product._id}>
          <th scope="row">
                <span className="mb-0 text-sm">
                 { product.name}
                </span>
          </th>
          <td>{ product.price }</td>
          {/* <td>{moment(user.createdAt).format('YYYY-MM-DD')}</td> */}
          <td>
            <div className="d-flex align-items-center">
              <div className="ml-2">
                <Button
                type="button"
                color="danger"
                onClick={() =>  {
                  setId(product._id)
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
                  setProduct(product)
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
                  إضافة منتوج
              </Button>
            </div>
          </Row>
          <Row>
            <div className="col">
              <Confirm message={message} id={id} confirm={confirm} confirmAction={deleteAction} toggleConfirmModal={setConfirmModal} />
              <AddProductModal setStatus={setStatus} setMessage={setMessage} currentPage={currentPage} open={addModal} toggleNotifyModal={setNotifyModal} toggleAddProductModal={setToggleAddModal}/>
              <EditProductModal product={product} setStatus={setStatus} setMessage={setMessage} currentPage={currentPage} open={edit} toggleNotifyModal={setNotifyModal} toggleEditProductModal={setEditModal}/>
              <Notification  message={message}  status={status} notify={notify}  toggleNotifyModal={setNotifyModal} />
              <Card className="shadow">
                <CardHeader className="d-flex justify-content-end border-0">
                  <h3 className="mb-0"> لائحة المنتجات </h3>
                </CardHeader>
                <Table dir="rtl" className="text-right" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"> الاسم</th>
                      <th scope="col">  الثمن (ريال) </th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                     {renderProducts()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                   <Paginations currentPage={currentPage} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} totalRecords={totalProducts} />
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