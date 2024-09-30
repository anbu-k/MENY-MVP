import React, { useState } from 'react';
import { useFormik } from 'formik';

const POSTMapForm = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      checked: false,
      infoId: '',
      zoomFunction: '',
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
        setResponseMessage(`Success: ${data.message}`); 
        formik.resetForm(); 
      } catch (error) {
        setErrorMessage(`Error: ${error.message}`);
        setResponseMessage('');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Map</label>
      <div>
        <label>Name: </label>
        <input 
          value={formik.values.name}
          onChange={formik.handleChange} 
          type="text" 
          id="map_name" 
          name="name"
        />
      </div>
      <div>
        <label>Checked:</label>
        <input 
          type="checkbox" 
          id="checked" 
          name="checked"
          checked={formik.values.checked}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label>Info Id: </label>
        <input 
          value={formik.values.infoId}
          onChange={formik.handleChange} 
          type="text" 
          id="info_id" 
          name="infoId"
        />
      </div>
      <div>
        <label>Zoom Function: </label>
        <input 
          value={formik.values.zoomFunction}
          onChange={formik.handleChange} 
          type="text" 
          id="map_zoom" 
          name="zoomFunction"
        />
      </div>

      <button type="submit">Submit</button>

      {/* Display response or error messages */}
      {responseMessage && <div style={{ color: 'green' }}>{responseMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default POSTMapForm;
