import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Modal,
  ListGroup,
  ListGroupItem,
  Badge 
} from "reactstrap";

import GoogleMap from '../../layouts/MapContainer'

const AddPlace = ({ toggleAddPlaceModal , currentModal , ride })=> {
    // console.log(ride)

    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={currentModal}
          toggle={() => toggleAddPlaceModal(false)}
          size="lg"
          style={{maxWidth: '1600px',  width: '80%'}}
        >
          <div className="modal-header">
            <h4 className="modal-title" id="modal-title-default">
             Add Place
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
          <div   className="modal-body">
          <ListGroup>
            <ListGroupItem><strong>Client</strong> : { ride.client ? <Link to={`/details/user/${ride.client._id}`} className="btn btn-info"> More info</Link> : 'client not fount'}  </ListGroupItem>
            <ListGroupItem><strong>Driver</strong> : {ride.driver ? <Link to={`/details/driver/${ride.driver._id}`} className="btn btn-info"> More info</Link> : 'driver not fount' }  </ListGroupItem>
            <ListGroupItem><strong>Payment Method</strong> : {ride.paymentMethod} </ListGroupItem>
            <ListGroupItem>{ride.paid ?  <Badge color="success">Paid</Badge> : <Badge color="danger">Not Paid</Badge>}</ListGroupItem>
          </ListGroup>
          </div>
          <div >
            <GoogleMap ride={ride}  style={{ height: '80%' , width:'80%' , marginRight:'15px' }} />
          </div>
        </Modal>
      </>
    );
}


export default React.memo(AddPlace)