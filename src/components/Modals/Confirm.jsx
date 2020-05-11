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
        dir="rtl"
          className="modal-dialog-centered modal-danger"
          isOpen={props.confirm}
          toggle={() => props.toggleConfirmModal(false)}
        >
         <div className="modal-content bg-gradient-danger">
            <div className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                المرجو الإنتباه !
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
                   نعم
                    </Button>

                    <Button
                    className="btn btn-link text-white ml-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => props.toggleConfirmModal(false)}
                    >
                    إلغاء
                    </Button>
                </div>
          </div>
        </Modal>
      </>
    );
}

export default Confirm;