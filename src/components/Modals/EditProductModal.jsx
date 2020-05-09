import React , { useState , useEffect } from "react";
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
import { updateProduct , fetchProducts } from "../../store/actions/products";


const EditProduct =({setMessage , toggleNotifyModal , toggleEditProductModal , open , product , currentPage })=> {

  const [name, setProductName] = useState("")
  const [price, setProductPrice] = useState("")
  const [stock, setProductStock] = useState("")
  const [description, setProductDesc] = useState("")
  const dispatch = useDispatch()

  useEffect(()=>{
    setProductName(product.name)
    setProductPrice(product.price)
    setProductStock(product.stock)
    setProductDesc(product.description)
  },[product])

 const saveProduct = () => {
    dispatch(updateProduct({data:{id:product._id,name,price,stock,description}}))
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
                <Label for="exampleEmail"><strong>إسم الموقع :</strong> </Label>
                <Input onChange={(e)=>  setProductName(e.target.value) } value={name} type="text" name="name" id="exampleEmail" placeholder="أدخل إسم الموقع" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>إسم الموقع :</strong> </Label>
                <Input onChange={(e)=>  setProductPrice(e.target.value) } value={price} type="text" name="price" id="exampleEmail" placeholder="أدخل إسم الموقع" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>إسم الموقع :</strong> </Label>
                <Input onChange={(e)=>  setProductStock(e.target.value) } value={stock} type="text" name="stock" id="exampleEmail" placeholder="أدخل إسم الموقع" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>إسم الموقع :</strong> </Label>
                <Input onChange={(e)=>  setProductDesc(e.target.value) } value={description} type="text" name="description" id="exampleEmail" placeholder="أدخل إسم الموقع" />
              </FormGroup>
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