import React , { useState } from "react";
// reactstrap components
import {
  Button,
  Modal,
  Input,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Label,
  FormText
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { CreateProduct , fetchProducts } from "../../store/actions/products";

const AddProduct =({setMessage , toggleNotifyModal , toggleAddProductModal , open , product , currentPage }) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState("")
  const dispatch = useDispatch()
 
  const onChange = e => {
    const files = Array.from(e.target.files)
    if(files.length > 0){
      setImage(files[0])
      const objectUrl = URL.createObjectURL(files[0])
      setPreview(objectUrl)
    }
  
  }

  const saveProduct = () => {
    if(isNaN(price)){
      setMessage("المرجو ادخال الثمن")
      toggleNotifyModal(true)
    }else{
        const formdata = new FormData()
        formdata.append("product_image", image);
        formdata.append("name", name);
        formdata.append("price", price);
        formdata.append("description", desc);
        for (var pair of formdata.entries()) {
          console.log(pair[0]+ ', ' +pair[1]); 
        }
      dispatch(CreateProduct({data:formdata}))
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
        setMessage("المرجو مراجعة المعلومات")
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
                <Label for="exampleEmail"><strong>وصف المنتج :</strong> </Label>
                <Input style={{ height: 200 }} onChange={(e)=>  setDesc(e.target.value) }  type="textarea" name="description" id="exampleEmail3" placeholder="أدخل وصف المنتج" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>ثمن المنتج (أرقام فقط) :</strong> </Label>
                <Input onChange={(e)=>  setPrice(e.target.value) }  type="text" name="price" id="exampleEmail2" placeholder="أدخل ثمن المنتج" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                <FormGroup>
                  <Label for="image"> صورة المنتوج</Label>
                  <Input  onChange={onChange} type="file" name="product_image" id="exampleFile" />
                  <FormText color="muted">
                  أدخل صورة المنتوج
                  </FormText>
                </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                 <img className="img-fluid"  src={preview} alt="" />
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