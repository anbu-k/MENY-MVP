import { useFormik } from 'formik';
import { CSSProperties, useState } from 'react';
import ColorPickerButton from './color-picker/color-picker-button.component';
import { LayerGroup } from '@prisma/client';
import { LayerSectionData } from '@prisma/client';

type LayerType = 'symbol' | 'fill' | 'line' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'raster-particle' | 'hillshade' | 'model' | 'background' | 'sky' | 'slot' | 'clip';
type SourceType = 'vector' | 'raster' | 'raster-dem' | 'raster-array' | 'geojson' | 'video' | 'image' | 'model' | 'batched-model';

type LayerFormProps = {
  groupName: string;
  sectionName: string;
}

export default function LayerForm(props: LayerFormProps) {
  const [showNewSourceInput, setShowNewSourceInput] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      iconColor: '',
      iconType: '',
      label: '',
      longitude: 0,
      latitude: 0,
      zoom: 0,
      bearing: 0,
      topLayerClass: '',
      infoId: '',
      type: '' as LayerType,
      sourceType: '' as SourceType,
      sourceUrl: '',
      sourceId: '',
      paint: '',
      sourceLayer: '',
      hover: false,
      click: false,
      time: false,
    },
    
    onSubmit: async (values) => {
      let layerVals = {
        layerName: values.layerName,
        sectionName: props.sectionName,
        sourceUrl: values.sourceUrl,
        type: values.type,
        paint: values.paint,
        sourceType: values.sourceType,
        sourceId: values.sourceId,
        sourceLayer: values.sourceLayer,
        hover: values.hover,
        time: values.time,
        click: values.click
      }
      try {
        await fetch('api/layer', {
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

  const checkboxStyling: CSSProperties = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '20%',
    height: '25px',
    boxSizing: 'border-box',
    cursor: 'pointer',
  };

  const labelStyling: CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
    minWidth: '70px',
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
        <label htmlFor="name" style={labelStyling}>Name:</label>
        <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} style={boxStyling} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="iconType" style={labelStyling}>Icon Type:</label>
        <input type="text" id="iconType" name="iconType" onChange={formik.handleChange} value={formik.values.iconType} style={boxStyling} />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="label" style={labelStyling}>Label:</label>
        <input type="text" id="label" name="label" onChange={formik.handleChange} value={formik.values.label} style={boxStyling} />
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
        <label htmlFor="zoom" style={labelStyling}>Zoom:</label>
        <input type="number" id="zoom" name="zoom" onChange={formik.handleChange} value={formik.values.zoom} style={boxStyling} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="bearing" style={labelStyling}>Bearing:</label>
        <input type="number" id="bearing" name="bearing" onChange={formik.handleChange} value={formik.values.bearing} style={boxStyling} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="topLayerClass" style={labelStyling}>Top Layer Class:</label>
        <input type="text" id="topLayerClass" name="topLayerClass" onChange={formik.handleChange} value={formik.values.topLayerClass} style={boxStyling} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="infoId" style={labelStyling}>Info ID:</label>
        <input type="text" id="infoId" name="infoId" onChange={formik.handleChange} value={formik.values.infoId} style={boxStyling} />
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
