import { useFormik } from 'formik';
import { CSSProperties, useState } from 'react';
import ColorPickerButton from './color-picker/color-picker-button.component';
import { LayerGroup } from '@prisma/client';
import IconPickerDropdown from './icon-picker/icon-picker-dropdown.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFontawesomeIcon } from '@/app/helpers/font-awesome.helper';
import { FontAwesomeLayerIcons } from '@/app/models/font-awesome.model';
import PreviewIcon from './preview-icon.component';

type LayerType = 'symbol' | 'fill' | 'line' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'raster-particle' | 'hillshade' | 'model' | 'background' | 'sky' | 'slot' | 'clip';
type SourceType = 'vector' | 'raster' | 'raster-dem' | 'raster-array' | 'geojson' | 'video' | 'image' | 'model' | 'batched-model';

type LayerFormProps = {
  groupName: string;
  sectionName: string;
}

export default function LayerForm(props: LayerFormProps) {

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
      topLayerClass: props.groupName,
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
        name: values.name,
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
        await fetch('api/LayerData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        alert('Layer added successfully');
        formik.resetForm();
      } catch (error: any) {
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

      {/* Got rid of this cause I don't think we need to show this
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="topLayerClass" style={labelStyling}>Top Layer Class:</label>
        <input disabled type="text" id="topLayerClass" name="topLayerClass" onChange={formik.handleChange} value={formik.values.topLayerClass} style={boxStyling} />
      </div> */}

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="infoId" style={labelStyling}>Info ID:</label>
        <input type="text" id="infoId" name="infoId" onChange={formik.handleChange} value={formik.values.infoId} style={boxStyling} />
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

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="iconColor" style={labelStyling}>Icon Color:</label>
        <div
          id="sourceLayer"
        >
        <ColorPickerButton callback={(newColor: string) => {
          formik.setValues({
            ...formik.values,
            iconColor: newColor
          });
        }}></ColorPickerButton>
        </div>

        <label htmlFor="iconType" style={labelStyling}>Icon Type:</label>
        <select
          id="iconType"
          name="iconType"
          onChange={formik.handleChange}
          value={formik.values.iconType}
          style={boxStyling}
        >
          <option value="">Select Icon Type</option>
          <option value="dots">Dots</option>
          <option value="info-circle">Info Circle</option>
          <option value="line">Line</option>
          <option value="square">Square</option>
          <option value="plus-square">Plus Square</option>
          <option value="minus-square">Minus Square</option>
        </select>

          {
            formik.values.iconColor && formik.values.iconType && (
              <><p>Result: </p><PreviewIcon iconType={formik.values.iconType} color={formik.values.iconColor }></PreviewIcon></>
            )
          }
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="hover" style={labelStyling}>Hover:</label>
        <input
          type="checkbox"
          id="hover"
          name="hover"
          onChange={formik.handleChange}
          checked={formik.values.hover}
          style={checkboxStyling}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <label htmlFor="click" style={labelStyling}>Click:</label>
        <input
          type="checkbox"
          id="click"
          name="click"
          onChange={formik.handleChange}
          checked={formik.values.click}
          style={checkboxStyling}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="time" style={labelStyling}>Time:</label>
          <input
            type="checkbox"
            id="time"
            name="time"
            onChange={formik.handleChange}
            checked={formik.values.time}
            style={checkboxStyling}
          />
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
