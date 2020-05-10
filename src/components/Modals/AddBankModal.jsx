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
import { CreateBank , fetchBanks } from "../../store/actions/banks";

const AddBank =({setMessage  , toggleNotifyModal,  toggleAddBankModal , open  , currentPage }) => {

  const [name, setBankName] = useState("")
  const [accountNumber, setBankAccNumber] = useState("")
  const [ibanNumber, setIbanNumber] = useState("")
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

  const saveBank = () => {
        const formdata = new FormData()
        formdata.append("bank_image", image);
        formdata.append("name", name);
        formdata.append("accountNumber", accountNumber);
        formdata.append("ibanNumber", ibanNumber);
        for (var pair of formdata.entries()) {
          console.log(pair[0]+ ', ' +pair[1]); 
        }
      dispatch(CreateBank({data:formdata}))
      .then(() => {
        const offset = (currentPage - 1) * 10;
        dispatch(fetchBanks({
          pagination: { page : offset , perPage: offset + 10 },
          sort: { field: 'name' , order: 'ASC' },
          filter: {},
        }))
        toggleAddBankModal(false)
      })
      .catch((err)=> {
        setMessage("المرجو مراجعة المعلومات")
        toggleNotifyModal(true)
      })
  }

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={() => toggleAddBankModal(false)}
        size="lg"
        style={{maxWidth: '1600px',  width: '80%'}}
      >
        <div dir="rtl" className="modal-header">
          <h4 className="modal-title" id="modal-title-default">
          إضافة البنك
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleAddBankModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div dir="rtl" className="container modal-body">
        <ListGroup className="text-right" dir="rtl">
            <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>إسم البنك :</strong> </Label>
                <Input onChange={(e)=>  setBankName(e.target.value) }  type="text" name="name" id="exampleEmail1" placeholder="أدخل إسم البنك" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>رقم الحساب :</strong> </Label>
                <Input onChange={(e)=>  setBankAccNumber(e.target.value) }  type="text" name="accountNumber" id="exampleEmail3" placeholder="أدخل رقم الحساب" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>رقم الايبان :</strong> </Label>
                <Input onChange={(e)=>  setIbanNumber(e.target.value) }  type="text" name="ibanNumber" id="exampleEmail2" placeholder="أدخل رقم الايبان" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                <FormGroup>
                  <Label for="image"> صورة البنك</Label>
                  <Input  onChange={onChange} type="file" name="bank_image" id="exampleFile" />
                  <FormText color="muted">
                  أدخل صورة البنك
                  </FormText>
                </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                 <img className="img-fluid"  src={preview} alt="" />
             </ListGroupItem>
          </ListGroup>
        </div>
        <div className="modal-footer">
          <Button dir="rtl"  onClick={(e)=> saveBank() } color="primary" type="button">
            <FontAwesomeIcon className="ml-2" icon={faSave} />
            حفظ
          </Button>
        </div>
      </Modal>
    </>
  );
}


export default AddBank