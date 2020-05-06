import React , { useState } from "react";
// reactstrap components
import {
  Button,
  Modal,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { CreateProduct , fetchProducts } from "../../store/actions/products";


const AddProduct = (props)=> {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [desc, setDesc] = useState("")
  const dispatch = useDispatch()


 
  const saveProduct = (e) => {
   
  }

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={props.open}
        toggle={() => props.toggleAddProductModal(false)}
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
            onClick={() => props.toggleAddProductModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div dir="rtl" className="container modal-body">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input onChange={(e)=>  setName(e.target.value) } placeholder="إسم المنتج" name="name" type="text" />
            </InputGroup>
          </FormGroup>

          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input onChange={(e)=>  setPrice(e.target.value) } placeholder="ثمن المنتج" name="price" type="text" />
            </InputGroup>
          </FormGroup>

          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input onChange={(e)=>  setStock(e.target.value) } placeholder="الكمية" name="stock" type="text" />
            </InputGroup>
          </FormGroup>

          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input onChange={(e)=>  setDesc(e.target.value) } placeholder="وصف المنتج" name="description" type="text" />
            </InputGroup>
          </FormGroup>
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