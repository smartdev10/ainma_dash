import React, { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import GoogleMap from '../../layouts/MapContainer'
import { updatePlace, fetchPlaces } from "../../store/actions/places";


const EditPlace = ({ setMessage, toggleNotifyModal, toggleEditPlaceModal, open, place, currentPage }) => {
  // console.log(ride)
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [position, setPosition] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    setName(place.name)
    setType(place.type)
    setPhoneNumber(place.phoneNumber)
    setPosition(place.position)
  }, [place])
  const savePlace = () => {
    dispatch(updatePlace({ id: place._id, data: { name, type, phoneNumber, source: "web", position } }))
      .then(() => {
        const offset = (currentPage - 1) * 10;
        dispatch(fetchPlaces({
          pagination: { page: offset, perPage: offset + 10 },
          sort: { field: 'name', order: 'ASC' },
          filter: {},
        }))
        setType("")
        setPhoneNumber("")
        toggleEditPlaceModal(false)
      })
      .catch((err) => {
        setMessage("حدث عطل اثناء التعديل")
        toggleNotifyModal(true)
      })
  }
  if (Object.keys(place).length === 0) {
    return null
  } else {
    const center = {
      lat: place.position.coordinates[0] || 24.774265,
      lng: place.position.coordinates[1] || 46.738586
    }
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={open}
          toggle={() => toggleEditPlaceModal(false)}
          size="lg"
          style={{ maxWidth: '1600px', width: '80%' }}
        >
          <div dir="rtl" className="modal-header">
            <h4 className="modal-title" id="modal-title-default">
              معلومات الموقع
            </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleEditPlaceModal(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <ListGroup className="text-right" dir="rtl">
              <ListGroupItem>
                <FormGroup>
                  <Label for="exampleEmail"><strong>إسم الموقع :</strong> </Label>
                  <Input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" id="exampleEmail" placeholder="أدخل إسم الموقع" />
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup>
                  <Label for="exampleSelect"><strong>نوع الموقع :</strong> </Label>
                  <Input onChange={(e) => setType(e.target.value)} value={type} type="select" name="type" id="exampleSelect">
                    <option></option>
                    <option>مسجد</option>
                    <option>مستشفى</option>
                  </Input>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup>

                  <>
                    <Label for="exampleSelect"><strong>رقم الهاتف :</strong> </Label>
                    <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" name="phoneNumber" id="exampleEmail" />
                  </>
                </FormGroup>
              </ListGroupItem>
            </ListGroup>
          </div>
          <div >
            <GoogleMap setPosition={setPosition} center={center} style={{ height: '80%', width: '80%', marginRight: '15px' }} />
          </div>
          <div className="modal-footer">
            <Button dir="rtl" onClick={() => savePlace()} color="primary" type="button">
              <FontAwesomeIcon className="ml-2" icon={faSave} />
              تعديل
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}


export default React.memo(EditPlace)