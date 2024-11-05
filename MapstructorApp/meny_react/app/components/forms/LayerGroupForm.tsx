import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayerGroup } from "@prisma/client";
import { useFormik } from "formik";
import { CSSProperties } from "react";

type NewLayerGroupFormProps = {
    sectionLayerName: string;
    afterSubmit: () => void
}

const boxStyling: CSSProperties = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  const labelStyling: CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  };

  const buttonStyling: CSSProperties = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  const buttonHoverStyling: CSSProperties = {
    backgroundColor: '#0056b3',
  };

const NewLayerGroupForm = (props: NewLayerGroupFormProps) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: ''
        },
          
        onSubmit: async (values) => {
            if(values.name?.length > 0) {
                const resultingLayerGroup: LayerGroup = {
                    name: values.name,
                    layerSectionName: props.sectionLayerName
                }
                try{
                    await fetch('http://localhost:3000/api/LayerGroup/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(resultingLayerGroup)
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
                <div style={{ marginBottom: '15px' }}>
                <label htmlFor="layerName" style={labelStyling}>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    style={boxStyling}
                />
                </div>
                <button type="submit"
                style={buttonStyling}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!)}
                >
                Submit
                </button>
        </form>
    )
}