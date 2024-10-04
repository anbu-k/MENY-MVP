import { useFormik } from "formik"
import { CSSProperties } from "react";


export default function LayerForm() {

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

    const boxStyling: CSSProperties = {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px'
    };
    
    const labelStyling: CSSProperties = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333'
    };
    
    const buttonStyling: CSSProperties = {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px'
    };
    
    const buttonHoverStyling: CSSProperties = {
        backgroundColor: '#0056b3'
    };
    
    return (
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}><strong>Add New Layer</strong></h2>
            
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="layerName" style={labelStyling}>Name:</label>
                <input type="text" id="layerName" name="layerName" onChange={formik.handleChange} value={formik.values.layerName} style={boxStyling} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="type" style={labelStyling}>Type:</label>
                <input type="text" id="type" name="type" onChange={formik.handleChange} value={formik.values.type} style={boxStyling} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="sourceType" style={labelStyling}>Source Type:</label>
                <input type="text" id="sourceType" name="sourceType" onChange={formik.handleChange} value={formik.values.sourceType} style={boxStyling} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="sourceUrl" style={labelStyling}>Source Url:</label>
                <input type="text" id="sourceUrl" name="sourceUrl" onChange={formik.handleChange} value={formik.values.sourceUrl} style={boxStyling} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="sourceId" style={labelStyling}>Source Id:</label>
                <input type="text" id="sourceId" name="sourceId" onChange={formik.handleChange} value={formik.values.sourceId} style={boxStyling} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="sourceLayer" style={labelStyling}>Source Layer:</label>
                <input type="text" id="sourceLayer" name="sourceLayer" onChange={formik.handleChange} value={formik.values.sourceLayer} style={boxStyling} />
            </div>
            
            <button style={buttonStyling} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!}
                type="submit">
                Submit
            </button>
        </form>
    );
}