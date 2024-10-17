import { useFormik } from 'formik';
import Modal from 'react-modal';
import EditForm from '../EditForm';

type EditMenuProps = {
    openWindow: () => void,
    closeWindow: () => void,
    isOpen: boolean,
}

const EditMenu = (props: EditMenuProps) => {

    const formik = useFormik({
        initialValues:{
          layerName: "",
          type: "",
          sectionName: "",
          sourceType: "",
          sourceUrl: "",
          sourceId: "",
          paint: "",
          sourceLayer: "",
        },
        
        onSubmit: async (values) => {
          await fetch('api/layer', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(values)
          })
        }
      });

    return (
        <>
            <a style={{
                border: '3px solid black',
                padding: '5px',
                marginTop: '10px',
                marginLeft: '3px',
                marginRight: '5px'

            }} onClick={props.openWindow}>
                New Layer
            </a>
            <Modal
                style={{
                    content: {
                        width: '30%',
                        right: '5px'
                    }
                }}
                isOpen={props.isOpen}
                onRequestClose={props.closeWindow}
                contentLabel='New Layer'
            >
                <EditForm></EditForm>
            </Modal>
        </>
    )
}

export default EditMenu;