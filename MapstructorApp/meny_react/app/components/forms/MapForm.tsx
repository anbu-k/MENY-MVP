import React, { useState } from 'react';
import { useFormik } from 'formik';
import { CSSProperties } from 'react';

const POSTMapForm = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      longitude: 0,
      latitude:                0,
      infoId:                  '',
      zoom:                    0,
      bearing:                 0,
      attributionControl:      false
    },
    
    onSubmit: async (values) => {
      try {
        const response = await fetch('api/map', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResponseMessage(`Success - map ID: ${data.message}`); 
        formik.resetForm(); 
      } catch (error) {
        setErrorMessage(`Error: ${error.message}`);
        setResponseMessage('');
      }
    },
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
        <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}><strong>Add New Map</strong></h2>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={labelStyling}>Name:</label>
            <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} style={boxStyling} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="longitude" style={labelStyling}>Longitude:</label>
            <input type="number" id="longitude" name="longitude" onChange={formik.handleChange} value={formik.values.longitude} style={boxStyling} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="latitude" style={labelStyling}>Latitude:</label>
            <input type="number" id="latitude" name="latitude" onChange={formik.handleChange} value={formik.values.latitude} style={boxStyling} />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="infoId" style={labelStyling}>Info ID:</label>
            <input type="text" id="infoId" name="infoId" onChange={formik.handleChange} value={formik.values.infoId} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="zoom" style={labelStyling}>Zoom:</label>
            <input type="number" id="zoom" name="zoom" onChange={formik.handleChange} value={formik.values.zoom} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="bearing" style={labelStyling}>Bearing:</label>
            <input type="number" id="bearing" name="bearing" onChange={formik.handleChange} value={formik.values.bearing} style={boxStyling} />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="attributionControl" style={labelStyling}>Attribution Control:</label>
            <input type="checkbox" id="attributionControl" name="attributionControl" onChange={formik.handleChange} value={formik.values.attributionControl} style={boxStyling} />
        </div>
        
        <button style={buttonStyling} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!}
            type="submit">
            Submit
        </button>
    </form>
);
};

export default POSTMapForm;
