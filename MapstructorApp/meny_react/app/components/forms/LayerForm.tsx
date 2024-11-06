import { useFormik } from 'formik';
import { CSSProperties, useState } from 'react';


type LayerType = 'symbol' | 'fill' | 'line' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'raster-particle' | 'hillshade' | 'model' | 'background' | 'sky' | 'slot' | 'clip';
type SourceType = 'vector' | 'raster' | 'raster-dem' | 'raster-array' | 'geojson' | 'video' | 'image' | 'model' | 'batched-model';
import { LayerSectionData } from '@prisma/client';

export default function LayerForm() {
  const [showNewSourceInput, setShowNewSourceInput] = useState(false);

  const [existingLayerSectionData, setExistingLayerSectionData] = useState<LayerSectionData[]>([]);

  const formik = useFormik({
    initialValues: {
      layerName: '',
      type: '' as LayerType,
      sectionName: '',
      sourceType: '' as SourceType,
      sourceUrl: '',
      sourceId: '',
      paint: '',
      sourceLayer: '',
    },
    
    onSubmit: async (values) => {
      try {
        const response = await fetch('api/layer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
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

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}>
        <strong>Add New Layer</strong>
      </h2>

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

      {/* <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sectionName" style={labelStyling}>Section Name:</label>
        <input
          type="text"
          id="sectionName"
          name="sectionName"
          onChange={formik.handleChange}
          value={formik.values.sectionName}
          style={boxStyling}
        />
      </div> */}

      {/* Dropdown for Source Type */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sourceType" style={labelStyling}>Source Type:</label>
        <select
          id="sourceType"
          name="sourceType"
          onChange={formik.handleChange}
          value={formik.values.sourceType}
          style={boxStyling}
        >
          <option value="">Select Source Type</option>
          <option value="vector">Vector</option>
          <option value="raster">Raster</option>
          <option value="raster-dem">Raster-DEM</option>
          <option value="raster-array">Raster-Array</option>
          <option value="geojson">GeoJSON</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="model">Model</option>
          <option value="batched-model">Batched-Model</option>
        </select>
      </div>

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

      {/* <div style={{ marginBottom: '15px' }}>
        <label htmlFor="paint" style={labelStyling}>Paint:</label>
        <input
          type="text"
          id="paint"
          name="paint"
          onChange={formik.handleChange}
          value={formik.values.paint}
          style={boxStyling}
        />
      </div> */}

      {/* Option to create a new source */}
      <div style={{ marginBottom: '15px' }}>
        <button
          type="button"
          style={buttonStyling}
          onClick={() => setShowNewSourceInput(!showNewSourceInput)}
        >
          {showNewSourceInput ? 'Cancel New Source' : 'Create New Source'}
        </button>

        {showNewSourceInput && (
          <div>
            <label htmlFor="newSource" style={labelStyling}>New Source:</label>
            <input
              type="text"
              id="newSource"
              name="newSource"
              onChange={formik.handleChange}
              style={boxStyling}
            />
          </div>
        )}
      </div>

      <button
        style={buttonStyling}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyling.backgroundColor!)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyling.backgroundColor!)}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
