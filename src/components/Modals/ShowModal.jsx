import React from "react";
// reactstrap components
import {
  Modal,
  ListGroup,
  ListGroupItem,
  Card , CardText, CardBody,
  CardTitle, CardSubtitle
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
             {/* <ListGroupItem >
               <strong>المنتجات :</strong>
                 {order.items.map(item =>{
                  return (
                    <ListGroup key={item._id}>
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
                      <ListGroupItem > 
                        <strong> الكمية</strong> : {item.quantity} 
                      </ListGroupItem>
                      </ListGroup> 
                  )
                 })}
             </ListGroupItem> */}
             <ListGroupItem className="d-flex flex-wrap" dir="rtl" >
                 {order.items.map(item =>{
                  return (
                    <Card className="m-2 shadow " key={item._id}>
                      <CardBody>
                        <CardTitle className="font-weight-bold"> {item.place.name} </CardTitle>
                      </CardBody>
                      <img className="m-auto" style={{objectFit:"contain"}} width="120rem" height="120rem" src={`http://54.88.189.39/pics/products/${item.product.picture}`} alt=""/>
                      <CardBody>
                        <CardSubtitle> {item.product.name}  </CardSubtitle>
                        <CardText>  {item.product.description}</CardText>
                        <CardText> <strong>الكمية</strong> : {item.quantity}</CardText>
                      </CardBody>
                    </Card>
                   
                  )
                 })}
             </ListGroupItem>
             <ListGroupItem className="bg-green text-white">
              <strong>المبلغ الإجمالي</strong> : { order.totalPrice ? order.totalPrice +  ' ريال'  : "غير وارد"  }
             </ListGroupItem>
             <ListGroupItem>
             <strong>البنك</strong> : {order.bank_id.name}
             </ListGroupItem>
             <ListGroupItem className="text-center">
                 <strong className="float-right">إيصال التحويل :</strong>
                 <p> <img className="img-fluid" src={`http://54.88.189.39/pics/receipts/${order.money_transfer_image}`} alt="" /></p>
             </ListGroupItem>
          </ListGroup>
            </div>
        </Modal>
      </>
    );
   }
}

export default ShowModal;