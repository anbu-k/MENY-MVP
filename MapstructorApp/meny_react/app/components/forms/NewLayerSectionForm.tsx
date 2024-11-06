import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";

type NewLayerSectionFormProps = {
    afterSubmit: () => void
}

const NewLayerSectionForm = (props: NewLayerSectionFormProps) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: ''
        },
          
        onSubmit: async (values) => {
            if(values.name?.length > 0) {
                try{
                    await fetch('http://localhost:3000/api/LayerSection/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values)
                    });
                    props.afterSubmit();
                }
                catch (error: any)
                {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <label htmlFor="layerName">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    style={{ flex: '1', border: '1px solid black' }}
                />
                <button type="submit" style={{ padding: '1px 6px', backgroundColor: '#007aff', color: 'white' }}>
                    <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.CHECKMARK, true)}></FontAwesomeIcon>
                </button>
            </div>
        </form>
    )
}

export default NewLayerSectionForm;