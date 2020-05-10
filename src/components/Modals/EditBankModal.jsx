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
import { updateBank , fetchBanks } from "../../store/actions/banks";


const EditBank =({setMessage , toggleNotifyModal , toggleEditBankModal , open , bank , currentPage })=> {

  const [name, setBankName] = useState("")
  const [accountNumber, setBankAccNumber] = useState("")
  const [ibanNumber, setIbanNumber] = useState("")
  const [preview, setPreview] = useState("")
  const [image, setImage] = useState({})
  const dispatch = useDispatch()

  useEffect(()=>{
    setBankName(bank.name)
    setBankAccNumber(bank.accountNumber)
    setIbanNumber(bank.ibanNumber)
    setPreview(`/pics/banks/${bank.picture}`)
  },[bank])

  
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
    formdata.append("id", bank._id);
    formdata.append("name", name);
    formdata.append("accountNumber", accountNumber);
    formdata.append("ibanNumber", ibanNumber);
    dispatch(updateBank({id:formdata.get("id"),data:formdata}))
    .then(() => {
      const offset = (currentPage - 1) * 10;
      dispatch(fetchBanks({
        pagination: { page : offset , perPage: offset + 10 },
        sort: { field: 'name' , order: 'ASC' },
        filter: {},
      }))
      toggleEditBankModal(false)
    })
    .catch((err)=> {
      setMessage("حدث عطل اثناء التعديل")
      toggleNotifyModal(true)
    })
 }

 if(Object.keys(bank).length === 0){
  return null
}else{
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={() => toggleEditBankModal(false)}
        size="lg"
        style={{maxWidth: '1600px',  width: '80%'}}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="modal-title-default">
          تعديل البنك 
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleEditBankModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
        <ListGroup className="text-right" dir="rtl">
            <ListGroupItem>
              <FormGroup>
                <Label for="name"><strong>إسم البنك :</strong> </Label>
                <Input onChange={(e)=>  setBankName(e.target.value) } value={name} type="text" name="name" id="name" placeholder="أدخل إسم البنك" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="description"><strong>رقم الحساب :</strong> </Label>
                <Input onChange={(e)=>  setBankAccNumber(e.target.value) } value={accountNumber} type="text" name="accountNumber" id="accountNumber" placeholder="أدخل رقم الحساب" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
              <FormGroup>
                <Label for="description"><strong>رقم الايبان :</strong> </Label>
                <Input onChange={(e)=>  setIbanNumber(e.target.value) } value={ibanNumber} type="text" name="accountNumber" id="accountNumber" placeholder="أدخل رقم الايبان" />
              </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                <FormGroup>
                  <Label for="image"> صورة البنك</Label>
                  <Input onChange={onChange} type="file" name="bank_image" id="exampleFile" />
                  <FormText color="muted">
                  أدخل صورة البنك
                  </FormText>
                </FormGroup>
             </ListGroupItem>
             <ListGroupItem>
                 <img className="img-fluid" src={preview} alt="" />
             </ListGroupItem>
          </ListGroup>
        </div>
        <div className="modal-footer">
          <Button onClick={(e)=> saveBank() } color="primary" type="button">
            <FontAwesomeIcon className="mr-2" icon={faSave} />
            تعديل
          </Button>
        </div>
      </Modal>
    </>
  );
 }
}


export default EditBank