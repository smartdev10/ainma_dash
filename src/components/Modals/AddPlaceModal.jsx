import React from "react";
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

const AddPlace = ({ toggleAddPlaceModal , open , place })=> {
    // console.log(ride)

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
                <Input type="text" name="name" id="exampleEmail" placeholder="أدخل إسم الموقع" />
              </FormGroup>
             </ListGroupItem>
            <ListGroupItem>
                <FormGroup>
                  <Label for="exampleSelect"><strong>نوع الموقع :</strong> </Label>
                  <Input type="select" name="type" id="exampleSelect">
                    <option>مسجد</option>
                    <option>مستشفى</option>
                  </Input>
                </FormGroup> 
            </ListGroupItem>
          </ListGroup>
          </div>
          <div >
            <GoogleMap place={place}  style={{ height: '60%' , width:'80%' , marginRight:'15px' }} />
          </div>
          <div className="modal-footer">
            <Button dir="rtl" color="primary" type="button">
              <FontAwesomeIcon className="ml-2" icon={faSave} />
              حفظ
            </Button>
          </div>
        </Modal>
      </>
    );
}


export default React.memo(AddPlace)