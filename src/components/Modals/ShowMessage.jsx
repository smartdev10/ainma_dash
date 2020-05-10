import React from "react";
// reactstrap components
import {
  Modal,
  Alert
} from "reactstrap";

const ShowMessage = ({message ,show ,  toggleShowModal}) => {

  if(Object.keys(message).length === 0){
    return null
 }else{
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={show}
          size="lg"
          toggle={() => toggleShowModal(false)}
        >
            <div dir="rtl" className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                الرسالة
                </h4>
                <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => toggleShowModal(false)}
                >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
            <Alert dir="rtl" className="text-right text-white" color="light">
              {message.message}
            </Alert>
            </div>
        </Modal>
      </>
    );
 }
}

export default ShowMessage;