import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

const ShowMessage = (props) => {


    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={props.show}
          size="lg"
          toggle={() => props.toggleShowModal(false)}
        >
            <div dir="rtl"  className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                Your attention is required
                </h4>
                <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => props.toggleShowModal(false)}
                >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
               
            </div>
                <div className="modal-footer">
                <Button
                    className="btn btn-white"
                    type="button"
                    onClick={() => {
                    }}
                    >
                     Save
                    </Button>

                    <Button
                    className="btn btn-link text-white ml-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => props.toggleConfirmModal(false)}
                    >
                    Close
                    </Button>
                </div>
        </Modal>
      </>
    );
}

export default ShowMessage;