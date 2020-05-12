import React , {useState , useEffect} from "react";
// reactstrap components
import {
  Button,
  Modal,
  // Input,
  // FormGroup,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupText,
} from "reactstrap";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState , convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";

import { updatePage , fetchPages } from "../../store/actions/pages";


const PageModal = ({doc , togglePageModal , currentModal })=> {
 
  const [content, setContent] = useState("")
  const [page, setDoc] = useState("")
  const [editorState, setEditorState] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  let contentState;
  let editorState1;
  if(content){
    const blocksFromHtml = htmlToDraft(content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    editorState1 = EditorState.createWithContent(contentState);
  }


  const saveDoc = (e) => {
   if(editorState.length !== 0){
    setLoading(true)
    dispatch(updatePage({id:doc._id , data:{page , body:draftToHtml(convertToRaw(editorState.getCurrentContent())) }}))
    .then(async()=> {
      setLoading(false)
      await dispatch(fetchPages())
      togglePageModal(false)
    })
    .catch((err)=> {
      setLoading(false)
    })
   }else{
    togglePageModal(false)
   }
  }
  
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };

  useEffect(() => {
    setContent(doc.body)
    setDoc(doc.page)
  }, [doc]);
 
  if(Object.keys(doc).length === 0){
    return null
 }else{
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={currentModal}
          toggle={() => togglePageModal(false)}
          size="lg"
          style={{maxWidth: '1600px',  width: '80%'}}
        >
          <div dir="rtl" className="modal-header">
            <h4 className="modal-title" id="modal-title-default">
             {doc.page}
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
          <div dir="rtl" className="modal-body">
          {/* <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-tag" />
                </InputGroupText>
              </InputGroupAddon>
              <Input onChange={ (e)=> setDoc(e.target.value)} placeholder="إسم الصفحة" value={page} name="page" type="text" />
            </InputGroup>
          </FormGroup> */}
          <Editor
            textDirectionality="RTL"
            defaultEditorState={editorState1}
            defaultContentState={contentState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
          </div>
          <div className="modal-footer">
            <Button  dir="rtl"   onClick={(e)=> saveDoc() } color="primary" type="button">
              <FontAwesomeIcon className="ml-2" icon={faSave} />
              {loading ? 'جاري التعديل...' : 'تعديل '}
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}


export default React.memo(PageModal)