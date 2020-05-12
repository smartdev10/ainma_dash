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
import React , {useState , useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Button,
  Container,
  Row,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit  } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
// import moment from 'moment';
// core components
import { useSelector , useDispatch  } from "react-redux";
import { fetchPages , deletePage , UploadSokia } from "../../store/actions/pages";
import Header from "components/Headers/Header.jsx";
import Paginations from "components/Footers/Paginations";
import EditPageModal from "components/Modals/EditPageModal";
import AddPageModal from "components/Modals/AddPageModal";
import Confirm from "components/Modals/Confirm";
import Notification from "components/Modals/Notification";
import {delay} from "utils/";


const Pages = () => {
  
  const [notify, setNotifyModal] = useState(false)
  const [addModal, setToggleAddModal] = useState(false)
  const [editModal, setToggleEditModal] = useState(false)
  const [confirm, setConfirmModal] = useState(false)
  const [message, setMessage] = useState("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
  const [doc , setDocument] = useState({})
  const [status, setStatus] = useState("danger")

  const [currentPage , setCurrentPage] = useState(1)
  const [image, setImage] = useState(undefined)

  const onChange = e => {
    const files = Array.from(e.target.files)
    if(files.length > 0){
      setImage(files[0])
    }
  }

  const handleSubmit = e => {
      e.preventDefault()
      if(image){
        const formdata = new FormData()
        formdata.append("sokia", image);
        dispatch(UploadSokia({data:formdata}))
        .then(() => {
          setStatus("success")
          setMessage("تمت العملية بنجاح !")
          setNotifyModal(true)
          delay(2000).then(()=>{
            setNotifyModal(false)
            setMessage("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
          })
        })
        .catch((err)=> {
          setStatus("danger")
          setMessage(`  لم تتم العملية بنجاح !`)
          setNotifyModal(true)
      })
    }
  }

  const pages = useSelector(state => state.pages)
  const totalPages = useSelector(state => state.totalPages)
  const dispatch = useDispatch()

  const deleteAction = (id) => {
    const offset = (currentPage - 1) * 10;
    setMessage("Deleting...")
    dispatch(deletePage({ids:[id]})).then(()=>{
      setMessage("تمت العملية بنجاح !")
      dispatch(fetchPages({
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
    dispatch(fetchPages({
      pagination: { page : offset , perPage: 10 },
      sort: { field: 'name' , order: 'ASC' },
      filter: {},
    }))
    setCurrentPage(currentPage)
  }
  useEffect(() => {
    dispatch(fetchPages())
  }, [dispatch]);

  const renderPages = () => {
    
    if(pages === 0 ){
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
    }else if(pages.length > 0){
      return pages.map((doc) => {
        return (
          <tr key={doc._id}>
          <th scope="row">
                <span className="mb-0 text-sm">
                 { doc.page}
                </span>
          </th>
          {/* <td>{moment(doc.createdAt).format('YYYY-MM-DD')}</td> */}

          <td>
            <div className="d-flex align-items-center">
              <div className="ml-2">
              <Button
              color="primary"
              type="button"
              onClick={() =>  {
                setToggleEditModal(c => !c)
                setDocument(doc)
              }}
              >
                <FontAwesomeIcon className="ml-2" icon={faEdit} />
                
                تعديل
              </Button>
              </div>
              {/* <div className="ml-2">
              <Button
              type="button"
              color="danger"
              onClick={() =>  {
                setDocument(doc)
                setConfirmModal(c => !c )
              }}
              >
                <FontAwesomeIcon className="ml-2" icon={faTrashAlt} />
                حذف
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
          <td>
           No data available 
          </td>    
        </tr>
       ) 
    }
   
  };

 
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
              <Row dir="rtl">
                {/* <div className="mr-3">
                  <Button
                    className="mb-3"
                    type="button"
                    onClick={() => {
                      setToggleAddModal(true) 
                    }}
                    >
                      <FontAwesomeIcon className="ml-3" icon={faPlusCircle} />
                      إضافة صفحة
                  </Button>
                </div> */}
               </Row>
              <Row>
              <div className="col">
              <EditPageModal doc={doc} currentModal={editModal} togglePageModal={setToggleEditModal}/>
              <Confirm message={message} id={doc._id} confirm={confirm} confirmAction={deleteAction} toggleConfirmModal={setConfirmModal} />
              <AddPageModal currentPage={currentPage} open={addModal} toggleAddPageModal={setToggleAddModal}/>
              <Notification  message={message}  status={status} notify={notify}  toggleNotifyModal={setNotifyModal} />

              <Card className="shadow">
                <CardHeader className="d-flex justify-content-end border-0">
                  <h3 className="mb-0">إعدادات</h3>
                </CardHeader>
                <Form onSubmit={handleSubmit}>
                  <FormGroup  dir="rtl" className="mr-3">
                    <Label className="float-right" for="image">صورة السقيا</Label>
                    <Input  onChange={onChange} type="file" name="sokia" id="exampleFile" />
                  </FormGroup>
                  <Button  color="primary" className="float-right m-2">تحميل الصورة</Button>
                </Form>
                <Table dir="rtl" className="text-right" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">الصفحة</th>
                      <th scope="col"/>
                    </tr>
                  </thead>
                  <tbody>
                     {renderPages()}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                    <Paginations currentPage={currentPage} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} totalRecords={totalPages} />
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
        </Container>
      </>
    );
}

export default Pages