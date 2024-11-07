import { useFormik } from 'formik';
import { CSSProperties, useState } from 'react';

type LayerType = 'symbol' | 'fill' | 'line' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'raster-particle' | 'hillshade' | 'model' | 'background' | 'sky' | 'slot' | 'clip';
type SourceType = 'vector' | 'raster' | 'raster-dem' | 'raster-array' | 'geojson' | 'video' | 'image' | 'model' | 'batched-model';

export default function LayerForm() {
  const [showNewSourceInput, setShowNewSourceInput] = useState(false);
  const [showPaintOptions, setShowPaintOptions] = useState(false); // State to control paint options visibility

  const formik = useFormik({
    initialValues: {
      layerName: '',
      type: '' as LayerType,
      sourceType: '' as SourceType,
      sourceUrl: '',
      sourceId: '',
      sourceLayer: '',
      fillColor: '#e3ed58',  // Default fill color
      fillOpacity: 0.5,  // Default opacity
      fillOutlineColor: '#FF0000',  // Default outline color
    },
    
    onSubmit: async (values) => {
      const formattedLayer = {
        ...values,
        paint: {
          'fill-color': values.fillColor,
          'fill-opacity': values.fillOpacity,
          'fill-outline-color': values.fillOutlineColor,
        },
      };

      try {
        const response = await fetch('api/layer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedLayer),
        });
        alert('Layer added successfully');
        formik.resetForm();
      } catch (error) {
        alert(`Error: ${error.message}`);
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

  const paintHeaderStyle: CSSProperties = {
    ...labelStyling,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}>
        <strong>Add New Layer</strong>
      </h2>

      {/* Layer Name Input */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="layerName" style={labelStyling}>Layer Name:</label>
        <input
          type="text"
          id="layerName"
          name="layerName"
          onChange={formik.handleChange}
          value={formik.values.layerName}
          style={boxStyling}
        />
      </div>

      {/* Dropdown for Type */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="type" style={labelStyling}>Type:</label>
        <select
          id="type"
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
          style={boxStyling}
        >
          <option value="">Select Type</option>
          <option value="symbol">Symbol</option>
          <option value="fill">Fill</option>
          <option value="line">Line</option>
          <option value="circle">Circle</option>
          <option value="heatmap">Heatmap</option>
          <option value="fill-extrusion">Fill-Extrusion</option>
          <option value="raster">Raster</option>
          <option value="raster-particle">Raster-Particle</option>
          <option value="hillshade">Hillshade</option>
          <option value="model">Model</option>
          <option value="background">Background</option>
          <option value="sky">Sky</option>
          <option value="slot">Slot</option>
          <option value="clip">Clip</option>
        </select>
      </div>

      {/* Source URL Input */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sourceUrl" style={labelStyling}>Source URL:</label>
        <input
          type="text"
          id="sourceUrl"
          name="sourceUrl"
          onChange={formik.handleChange}
          value={formik.values.sourceUrl}
          style={boxStyling}
        />
      </div>

      {/* Source ID Input */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sourceId" style={labelStyling}>Source ID:</label>
        <input
          type="text"
          id="sourceId"
          name="sourceId"
          onChange={formik.handleChange}
          value={formik.values.sourceId}
          style={boxStyling}
        />
      </div>

      {/* Source Layer Input */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sourceLayer" style={labelStyling}>Source Layer:</label>
        <input
          type="text"
          id="sourceLayer"
          name="sourceLayer"
          onChange={formik.handleChange}
          value={formik.values.sourceLayer}
          style={boxStyling}
        />
      </div>

     {/* Paint Options Header */}
      <div
        style={paintHeaderStyle}
        onClick={() => setShowPaintOptions(!showPaintOptions)}
      >
        <span>Paint Options</span>
        <span>{showPaintOptions ? '▲' : '▼'}</span>
      </div>

      {/* Conditional Paint Settings with Extra Margin */}
      {showPaintOptions && (
        <div style={{ marginBottom: '20px' }}> {/* Add bottom margin for spacing */}
          {/* Background Fill Color Picker */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="fillColor" style={labelStyling}>Background Fill Color:</label>
            <input
              type="color"
              id="fillColor"
              name="fillColor"
              onChange={formik.handleChange}
              value={formik.values.fillColor}
              style={{ ...boxStyling, padding: '5px' }}
            />
          </div>

          {/* Fill Opacity Input */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="fillOpacity" style={labelStyling}>Fill Opacity:</label>
            <input
              type="number"
              id="fillOpacity"
              name="fillOpacity"
              onChange={formik.handleChange}
              value={formik.values.fillOpacity}
              min="0"
              max="1"
              step="0.1"
              style={boxStyling}
            />
          </div>

          {/* Outline Color Picker */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="fillOutlineColor" style={labelStyling}>Outline Color:</label>
            <input
              type="color"
              id="fillOutlineColor"
              name="fillOutlineColor"
              onChange={formik.handleChange}
              value={formik.values.fillOutlineColor}
              style={{ ...boxStyling, padding: '5px' }}
            />
          </div>
        </div>
      )}

      <button
        style={{ ...buttonStyling, marginTop: '40px'}}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!)}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
