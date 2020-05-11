import React from "react";
// reactstrap components
import {
  Modal,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation , faCheckCircle } from '@fortawesome/free-solid-svg-icons'
const Notification = (props) => {


    return (
      <>
        <Modal
          dir="rtl"
          className={`modal-dialog-centered modal-${props.status}`}
          isOpen={props.notify}
          toggle={() => {
            props.toggleNotifyModal(false)
          }}
        >
         <div className={`modal-content bg-gradient-${props.status}`}>
            <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                {props.success}
                </h4>
            </div>
            <div className="modal-body">
                <div className="py-3 text-center">
                    <FontAwesomeIcon size="3x" className="mb-3"  icon={props.status === "success" ? faCheckCircle : faExclamation}/>

                    <p>{props.message}</p>
                </div>
            </div>
                <div className="modal-footer">
                </div>
          </div>
        </Modal>
      </>
    );
}

export default Notification;