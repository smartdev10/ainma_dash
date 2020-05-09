import React ,{useState} from "react";
// reactstrap components
import {
  Modal,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import GoogleMap from '../../layouts/MapContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { CreatePlace , fetchPlaces } from "../../store/actions/places";


const AddPlace = ({setMessage , toggleNotifyModal  , currentPage, toggleAddPlaceModal , open })=> {


    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [position, setPosition] = useState(null)

    const dispatch = useDispatch()
    const savePlace = ()=>{
      console.log({name,type,position})
      if(name.length > 0 && type.length > 0 && position){
        dispatch(CreatePlace({data:{name,type,position}}))
        .then(() => {
          const offset = (currentPage - 1) * 10;
          dispatch(fetchPlaces({
            pagination: { page : offset , perPage: offset + 10 },
            sort: { field: 'name' , order: 'ASC' },
            filter: {},
          }))
          toggleAddPlaceModal(false)
        })
        .catch((err)=> {
          setMessage("Couldn't Add Place")
          toggleNotifyModal(true)
        })
      } 
    }
    const center = {
      lat:24.774265,
      lng:46.738586
    }
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={open}
          toggle={() => toggleAddPlaceModal(false)}
          size="lg"
          style={{maxWidth: '1600px',  width: '80%'}}
        >
          <div dir="rtl" className="modal-header d-flex justify-content-end">
            <h4 className="modal-title" id="modal-title-default">
            إضافة موقع
            </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleAddPlaceModal(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div   className="container modal-body">
          <ListGroup className="text-right" dir="rtl">
            <ListGroupItem>
              <FormGroup>
                <Label for="exampleEmail"><strong>إسم الموقع :</strong> </Label>
                <Input onChange={(e)=>  setName(e.target.value) } type="text" name="name" id="exampleEmail" placeholder="أدخل إسم الموقع" />
              </FormGroup>
             </ListGroupItem>
            <ListGroupItem>
                <FormGroup>
                  <Label for="exampleSelect"><strong>نوع الموقع :</strong> </Label>
                  <Input onChange={(e)=>  setType(e.target.value) } type="select" name="type" id="exampleSelect">
                    <option></option>
                    <option>مسجد</option>
                    <option>مستشفى</option>
                  </Input>
                </FormGroup> 
            </ListGroupItem>
          </ListGroup>
          </div>
          <div >
            <GoogleMap setPosition={setPosition} center={center}  style={{ height: '60%' , width:'80%' , marginRight:'15px' }} />
          </div>
          <div className="modal-footer">
            <Button dir="rtl" onClick={()=> savePlace()} color="primary" type="button">
              <FontAwesomeIcon  className="ml-2" icon={faSave} />
              حفظ
            </Button>
          </div>
        </Modal>
      </>
    );
}


export default React.memo(AddPlace)