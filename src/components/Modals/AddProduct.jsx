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

  const [editorState, setEditorState] = useState("")
  const [doc, setDoc] = useState("")
  const dispatch = useDispatch()


 
  const saveDoc = (e) => {
   
  }

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={props.open}
        toggle={() => props.toggleAddPageModal(false)}
        size="lg"
        style={{maxWidth: '1600px',  width: '80%'}}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="modal-title-default">
            Add Page
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => props.toggleAddPageModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input onChange={(e)=>  setDoc(e.target.value) } placeholder="Document Name" name="document" type="text" />
            </InputGroup>
          </FormGroup>
        </div>
        <div className="modal-footer">
          <Button onClick={(e)=> saveDoc() } color="primary" type="button">
            <FontAwesomeIcon className="mr-2" icon={faSave} />
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
}


export default AddProduct