import { useFormik } from "formik"
import { CSSProperties, useEffect, useState } from "react";
import {LayerData as PrismaLayer} from '@prisma/client';
import { json } from "stream/consumers";
import Loader from "../loading/loading.component";

type LayerType = 'symbol' | 'fill' | 'line' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'raster-particle' | 'hillshade' | 'model' | 'background' | 'sky' | 'slot' | 'clip';
type SourceType = 'vector' | 'raster' | 'raster-dem' | 'raster-array' | 'geojson' | 'video' | 'image' | 'model' | 'batched-model';


const EditForm = (props: {id: string, afterSubmit: (formVisible: boolean) => void}) => {
    const [layer, setLayer] = useState<PrismaLayer>({
      id: '',
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
      time: false,});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await fetch('http://localhost:3000/api/LayerData/' + props.id)
                .then((response) => {
                response.json()?.then(parsed => {
                    setLayer(parsed.layerData);
                })
            });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        id: layer.id,
        name: layer.name,
        iconColor: layer.iconColor,
        iconType: layer.iconType,
        label: layer.label,
        longitude: layer.longitude as number,
        latitude: layer.latitude as number,
        zoom: layer.zoom as number,
        bearing: layer.bearing as number,
        topLayerClass: layer.topLayerClass,
        infoId: layer.infoId as string,
        type: layer.type as LayerType,
        sourceType: layer.sourceType as SourceType,
        sourceUrl: layer.sourceUrl,
        sourceId: layer.sourceId,
        paint: layer.paint,
        sourceLayer: layer.sourceLayer,
        hover: layer.hover,
        click: layer.click,
        time: layer.time,
        },
      
      onSubmit: async (values) => {
        try{
          await fetch('http://localhost:3000/api/LayerData/' + props.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });
        alert(`Layer Updated`);
        props.afterSubmit(false);
        }
        catch (error: any)
        {
          alert(`Error: ${error.message}`);
        }
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
        <div>
            {isLoading ? (
                <Loader/>
            ) : (    
                <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h2 style={{ paddingBottom: '8px', color: '#333', textAlign: 'center' }}>
                  <strong>Edit {layer?.label}</strong>
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
                  Update
                </button>
              </form>
            )}
        </div>
    );
}
export default EditForm;
