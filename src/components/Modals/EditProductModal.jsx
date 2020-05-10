import React , { useState , useEffect } from "react";
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
import { updateProduct , fetchProducts } from "../../store/actions/products";


const EditProduct =({setMessage , toggleNotifyModal , toggleEditProductModal , open , product , currentPage })=> {

  const [name, setProductName] = useState("")
  const [price, setProductPrice] = useState("")
  const [description, setProductDesc] = useState("")
  const [preview, setPreview] = useState("")
  const [image, setImage] = useState({})
  const dispatch = useDispatch()

  useEffect(()=>{
    setProductName(product.name)
    setProductPrice(product.price)
    setProductDesc(product.description)
    setPreview(`/pics/products/${product.picture}`)
  },[product])

  
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
    formdata.append("id", product._id);
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    dispatch(updateProduct({id:formdata.get("id"),data:formdata}))
    .then(() => {
      const offset = (currentPage - 1) * 10;
      dispatch(fetchProducts({
        pagination: { page : offset , perPage: offset + 10 },
        sort: { field: 'name' , order: 'ASC' },
        filter: {},
      }))
      toggleEditProductModal(false)
    })
    .catch((err)=> {
      setMessage("Couldn't Edit Product")
      toggleNotifyModal(true)
    })
  } 
 }

 if(Object.keys(product).length === 0){
  return null
}else{
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={() => toggleEditProductModal(false)}
        size="lg"
        style={{maxWidth: '1600px',  width: '80%'}}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="modal-title-default">
          تعديل المنتج 
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleEditProductModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
        <ListGroup className="text-right" dir="rtl">
            <ListGroupItem>
              <FormGroup>
                <Label for="name"><strong>إسم المنتج :</strong> </Label>
                <Input onChange={(e)=>  setProductName(e.target.value) } value={name} type="text" name="name" id="name" placeholder="أدخل إسم المنتج" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="description"><strong>وصف المنتج :</strong> </Label>
                <Input style={{ height: 200 }} onChange={(e)=>  setProductDesc(e.target.value) } value={description} type="textarea" name="description" id="description" placeholder="أدخل وصف المنتج" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="price"><strong>ثمن المنتج (أرقام فقط) :</strong> </Label>
                <Input onChange={(e)=>  setProductPrice(e.target.value) } value={price} type="text" name="price" id="price" placeholder="أدخل ثمن المنتج" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                <FormGroup>
                  <Label for="image"> صورة المنتوج</Label>
                  <Input onChange={onChange} type="file" name="product_image" id="exampleFile" />
                  <FormText color="muted">
                  أدخل صورة المنتوج
                  </FormText>
                </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                 <img className="img-fluid" src={preview} alt="" />
             </ListGroupItem>
          </ListGroup>
        </div>
        <div className="modal-footer">
          <Button onClick={(e)=> saveProduct() } color="primary" type="button">
            <FontAwesomeIcon className="mr-2" icon={faSave} />
            تعديل
          </Button>
        </div>
      </Modal>
    </>
  );
 }
}


export default EditProduct