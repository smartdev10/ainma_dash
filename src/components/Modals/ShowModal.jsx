import React from "react";
// reactstrap components
import {
  Modal,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";

const ShowModal = ({show , toggleShowModal , order}) => {
  console.log(order)
  if(Object.keys(order).length === 0){
    return null
   }else{
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={show}
          size="lg"
          toggle={() => toggleShowModal(false)}
          style={{maxWidth: '1600px',  width: '80%'}}>
            <div dir="rtl"  className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                تفاصيل الطلب
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
            <ListGroup className="text-right" dir="rtl">
             <ListGroupItem>
              <strong> صاحب الطلب</strong> : {order.user.name}
             </ListGroupItem>
             <ListGroupItem>
             <strong>  المنتجات </strong>
                 {order.items.map(item =>{
                  return (
                    <ListGroup>
                      <ListGroupItem >
                        <strong>إسم المنتج</strong> : {item.product.name} 
                      </ListGroupItem>
                      <ListGroupItem > 
                        <strong>ثمن المنتج</strong> : {item.product.price}
                      </ListGroupItem>
                      <ListGroupItem > 
                        <strong>إسم الموقع</strong> : {item.place.name} 
                          </ListGroupItem>
                      <ListGroupItem > 
                        <strong>نوع الموقع</strong> : {item.place.type} 
                      </ListGroupItem>
                      </ListGroup> 
                  )
                 })}
             </ListGroupItem>
             {/* <ListGroupItem>
             
             </ListGroupItem> */}
             <ListGroupItem>
             <strong>البنك</strong> : {order.bank_id.name}
             </ListGroupItem>
             <ListGroupItem>
                 <strong> صورة الإيصال</strong>
                 <img className="img-fluid" src={`http://54.88.189.39/pics/receipts/${order.money_transfer_image}`} alt="" />
             </ListGroupItem>
          </ListGroup>
            </div>
        </Modal>
      </>
    );
   }
}

export default ShowModal;