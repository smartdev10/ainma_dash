import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

const Confirm = (props) => {


    return (
      <>
        <Modal
          className="modal-dialog-centered modal-danger"
          isOpen={props.confirm}
          toggle={() => props.toggleConfirmModal(false)}
        >
         <div className="modal-content bg-gradient-danger">
            <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                Your attention is required
                </h4>
                <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => props.toggleConfirmModal(false)}
                >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="py-3 text-center">
                    <i className="ni ni-bell-55 ni-3x"></i>
                    <h4 className="heading mt-4">You should read this!</h4>
                    <p>{props.message}</p>
                </div>
            </div>
                <div className="modal-footer">
                <Button
                    className="btn btn-white"
                    type="button"
                    onClick={() => {
                        props.confirmAction(props.id)
                    }}
                    >
                    Yes I am Sure
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
          </div>
        </Modal>
      </>
    );
}

export default Confirm;