import React , { useState } from "react";
// reactstrap components
import {
  Button,
  Modal,
  Input,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Label
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { CreateProduct , fetchProducts } from "../../store/actions/products";


const AddProduct =({setMessage , toggleNotifyModal , toggleAddProductModal , open , product , currentPage }) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const dispatch = useDispatch()
 
  const saveProduct = () => {
    if(isNaN(price)){
      setMessage("المرجو ادخال الثمن")
      toggleNotifyModal(true)
    }else{
      dispatch(CreateProduct({data:{name,price,description:desc}}))
      .then(() => {
        const offset = (currentPage - 1) * 10;
        dispatch(fetchProducts({
          pagination: { page : offset , perPage: offset + 10 },
          sort: { field: 'name' , order: 'ASC' },
          filter: {},
        }))
        toggleAddProductModal(false)
      })
      .catch((err)=> {
        setMessage("")
        toggleNotifyModal(true)
      })
    }
  }

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={() => toggleAddProductModal(false)}
        size="lg"
        style={{maxWidth: '1600px',  width: '80%'}}
      >
        <div dir="rtl" className="modal-header">
          <h4 className="modal-title" id="modal-title-default">
          إضافة منتوج
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleAddProductModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div dir="rtl" className="container modal-body">
        <ListGroup className="text-right" dir="rtl">
            <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>إسم المنتج :</strong> </Label>
                <Input onChange={(e)=>  setName(e.target.value) }  type="text" name="name" id="exampleEmail1" placeholder="أدخل إسم المنتج" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>ثمن المنتج :</strong> </Label>
                <Input onChange={(e)=>  setPrice(e.target.value) }  type="text" name="price" id="exampleEmail2" placeholder="أدخل ثمن المنتج" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>وصف المنتج :</strong> </Label>
                <Input style={{ height: 200 }} onChange={(e)=>  setDesc(e.target.value) }  type="textarea" name="description" id="exampleEmail3" placeholder="أدخل وصف المنتج" />
              </FormGroup>
             </ListGroupItem>
          </ListGroup>
        </div>
        <div className="modal-footer">
          <Button dir="rtl"  onClick={(e)=> saveProduct() } color="primary" type="button">
            <FontAwesomeIcon className="ml-2" icon={faSave} />
            حفظ
          </Button>
        </div>
      </Modal>
    </>
  );
}


export default AddProduct