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
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { CreatePage , fetchPages } from "../../store/actions/pages";


const AddPageModal = (props)=> {

  const [editorState, setEditorState] = useState("")
  const [doc, setDoc] = useState("")
  const dispatch = useDispatch()


  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };
  const saveDoc = (e) => {
    const {currentPage} = props
    dispatch(CreatePage({data:{page:doc,body:draftToHtml(convertToRaw(editorState.getCurrentContent())) }}))
    .then(async ()=> {
      
      const offset = (currentPage - 1) * 10;

      dispatch(fetchPages({
        pagination: { page : offset , perPage: offset + 10 },
        sort: { field: 'name' , order: 'ASC' },
        filter: {},
      }))
      props.toggleAddPageModal(false)
    })
    .catch((err)=> {
    })
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
          إضافة صفحة
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
        <div dir="rtl" className="modal-body">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input onChange={(e)=>  setDoc(e.target.value) } placeholder="إسم الصفحة" name="document" type="text" />
            </InputGroup>
          </FormGroup>
          <Editor
            textAlignment="right"
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <div className="modal-footer">
          <Button  dir="rtl"  onClick={(e)=> saveDoc() } color="primary" type="button">
            <FontAwesomeIcon className="ml-2" icon={faSave} />
            حفظ
          </Button>
        </div>
      </Modal>
    </>
  );
}


export default AddPageModal