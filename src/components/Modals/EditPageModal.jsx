import React , {useState , useEffect} from "react";
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

import { updateDocument , fetchDocuments } from "../../store/actions/products";


const PageModal = ({doc , togglePageModal , currentModal })=> {
 
  const [content, setContent] = useState("")
  const [document, setDoc] = useState("")
  const [editorState, setEditorState] = useState("")

  const dispatch = useDispatch()
  let contentState;
  let editorState1;
  
  const saveDoc = (e) => {
    
  }
  
 
  useEffect(() => {
    setContent(doc.body)
    setDoc(doc.document)
  }, [doc]);

    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={currentModal}
          toggle={() => togglePageModal(false)}
          size="lg"
          style={{maxWidth: '1600px',  width: '80%'}}
        >
          <div className="modal-header">
            <h4 className="modal-title" id="modal-title-default">
             {doc.document}
            </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => togglePageModal(false)}
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
              <Input onChange={ (e)=> setDoc(e.target.value)} placeholder="Page Name" value={document} name="document" type="text" />
            </InputGroup>
          </FormGroup>
         
          </div>
          <div className="modal-footer">
            <Button  onClick={(e)=> saveDoc() } color="primary" type="button">
              <FontAwesomeIcon className="mr-2" icon={faSave} />
              Save
            </Button>
          </div>
        </Modal>
      </>
    );
}


export default PageModal