import React , {useEffect , useState} from "react";
// reactstrap components
import {
  Modal,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
  Button,
  Label
} from "reactstrap";
import { UploadSokia , fetchOneImage , deleteSokia } from "../../store/actions/pages";
import { useDispatch  } from "react-redux";
import {delay} from "utils/";

const UploadModal = ({setStatus , setMessage, up , toggleUploadModal , toggleNotifyModal }) => {

  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingd, setLoadingd] = useState(false)
  const [image, setImage] = useState([])
  const dispatch = useDispatch()

    const handleSubmit = e => {
      e.preventDefault()
      console.log(image)
      if(image instanceof File){
        const formdata = new FormData()
        formdata.append("sokia", image);
        setLoading(true)
        dispatch(UploadSokia({data:formdata}))
        .then(() => {
          setStatus("success")
          setMessage("تمت العملية بنجاح !")
          setLoading(false)
          toggleNotifyModal(true)
          delay(2000).then(()=>{
            toggleNotifyModal(false)
            setMessage("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
          })
        })
        .catch((err)=> {
          setLoading(false)
          setStatus("danger")
          setMessage(`  لم تتم العملية بنجاح !`)
          toggleNotifyModal(true)
      })
    }else{
      setStatus("danger")
      setMessage(` المرجو اختيار الصورة`)
      toggleNotifyModal(true)
    }
  }

  const deleteImage = e => {
      setLoadingd(true)
      dispatch(deleteSokia({ids:[]}))
      .then(() => {
        setStatus("success")
        setMessage("تمت العملية بنجاح !")
        setLoadingd(false)
        toggleNotifyModal(true)
        setPreview('')
        delay(1000).then(()=>{
          toggleNotifyModal(false)
          setMessage("هل أنت متؤكد  من أنك تريد حذف هذا ؟")
        })
      })
      .catch((err)=> {
        setLoadingd(false)
        setStatus("danger")
        setMessage(`  لم تتم العملية بنجاح !`)
        toggleNotifyModal(true)
    })
}

  useEffect(()=>{
    dispatch(fetchOneImage({id:'sokia'}))
    .then((image) => {
    setPreview(`/pics/${image.name}`)
    })
    .catch((err)=> {
   
   })
  },[dispatch])

  const onChange = e => {
    const files = Array.from(e.target.files)
    console.log(files)
    if(files.length > 0){
      setImage(files[0])
      const objectUrl = URL.createObjectURL(files[0])
      setPreview(objectUrl)
      console.log(preview)
    }
  }
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={up}
          size="lg"
          toggle={() => toggleUploadModal(false)}
          style={{maxWidth: '1600px',  width: '80%'}}>
            <div dir="rtl"  className="modal-header">
                <h4 className="modal-title" id="modal-title-default">
                صورة السقيا
                </h4>
                <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => toggleUploadModal(false)}
                >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
             <ListGroup className="text-right" dir="rtl">
              <ListGroupItem>
                <Form onSubmit={handleSubmit}>
                  <FormGroup  dir="rtl" className="mr-3">
                    <Label className="float-right" for="image">تعديل صورة السقيا </Label>
                    <Input onClick={e => e.target.value = null} onChange={onChange} type="file" name="sokia" id="exampleFile" />
                  </FormGroup>
                  <Button  color="primary" className="float-right m-2">  {loading ? 'جاري التحميل...' : 'تحميل الصورة'}</Button>
                </Form>
               { preview !== "" ?  <Button onClick={deleteImage}   color="danger" className="float-right m-2">  { loadingd ? 'جاري الحذف...' : 'حذف الصورة' }</Button>  : null }   
              </ListGroupItem>
              <ListGroupItem>
                 <img className="img-fluid" src={preview} alt="" />
              </ListGroupItem>
             </ListGroup>
            </div>
        </Modal>
      </>
    );
}

export default UploadModal;