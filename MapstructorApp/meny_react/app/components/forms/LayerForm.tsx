import { FieldArray, FormikProvider, useFormik } from "formik";
import { CSSProperties, useState } from "react";
import ColorPickerButton from "./color-picker/color-picker-button.component";
import { LayerGroup } from "@prisma/client";
import IconPickerDropdown from "./icon-picker/icon-picker-dropdown.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import PreviewIcon from "./preview-icon.component";

type LayerType =
  | "symbol"
  | "fill"
  | "line"
  | "circle"
  | "heatmap"
  | "fill-extrusion"
  | "raster"
  | "raster-particle"
  | "hillshade"
  | "model"
  | "background"
  | "sky"
  | "slot"
  | "clip";
type SourceType =
  | "vector"
  | "raster"
  | "raster-dem"
  | "raster-array"
  | "geojson"
  | "video"
  | "image"
  | "model"
  | "batched-model";

type LayerFormProps = {
  groupName: string;
  sectionName: string;
};

export default function LayerForm(props: LayerFormProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      iconColor: "",
      iconType: "",
      label: "",
      longitude: 0,
      latitude: 0,
      zoom: 0,
      bearing: 0,
      topLayerClass: props.groupName,
      infoId: "",
      type: "" as LayerType,
      sourceType: "" as SourceType,
      sourceUrl: "",
      sourceId: "",
      paint: "",
      sourceLayer: "",
      hover: false,
      click: false,
      time: false,
      hoverStyle: "",
      clickStyle: "",
      clickHeader: "",
      hoverContent: [{ label: "", type: "" }],
      fillColor: "#e3ed58",
      fillOpacity: 0.5,
      fillOutlineColor: "#FF0000",
      textColor: "#000080",
      textHaloColor: "#ffffff",
      textHaloWidth: 2,
      circleColor: "#097911", // Default values
      circleOpacity: 1,
      circleRadius: 5,
      circleStrokeColor: "#0000ee",
      circleStrokeWidth: 2,
      lineColor: "#ff9900",
      lineWidth: 5,
      lineBlur: 0,
      lineOpacity: 1.0,
      layout: {
        "text-field": "{name}", // Placeholder text property
        "text-size": 12, // Default text size
        "icon-image": "marker-icon", // Default icon name
        "icon-size": 0.5, // Default icon size
      },
    },

    onSubmit: async (values) => {
      const paint: Record<string, any> = {};
      const layout: Record<string, any> = values.layout || {};

      if (values.type === "fill") {
        paint["fill-color"] = values.fillColor ?? "#e3ed58";
        paint["fill-opacity"] = values.fillOpacity ?? 0.5;
        paint["fill-outline-color"] = values.fillOutlineColor ?? "#FF0000";
      } else if (values.type === "symbol") {
        paint["text-color"] = values.textColor ?? "#000080";
        paint["text-halo-color"] = values.textHaloColor ?? "#ffffff";
        paint["text-halo-width"] = values.textHaloWidth ?? 2;

        layout["text-field"] = values.layout["text-field"] ?? "{name}"; // Placeholder text property
        layout["text-size"] = values.layout["text-size"] ?? 12; // Default text size
        layout["icon-image"] = values.layout["icon-image"] ?? "marker-icon"; // Default icon name
        layout["icon-size"] = values.layout["icon-size"] ?? 0.5; // Default icon size
      } else if (values.type === "circle") {
        paint["circle-color"] = values.circleColor ?? "#FF0000";
        paint["circle-opacity"] = values.circleOpacity ?? 0.5;
        paint["circle-radius"] = values.circleRadius ?? 5;
        paint["circle-stroke-color"] = values.circleStrokeColor ?? "#000000";
        paint["circle-stroke-width"] = values.circleStrokeWidth ?? 1;
      } else if (values.type === "line") {
        paint["line-color"] = values.lineColor ?? "#ff9900";
        paint["line-width"] = values.lineWidth ?? 5;
        paint["line-blur"] = values.lineBlur ?? 0;
        paint["line-opacity"] = values.lineOpacity ?? 1.0;
      }

      const layerData = {
        ...values,
        paint: JSON.stringify(paint),
        layout: JSON.stringify(layout),
      };

      try {
        await fetch("api/LayerData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(layerData),
        });
        alert("Layer added successfully");
        formik.resetForm();
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    },
  });

  const boxStyling: CSSProperties = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "10px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
  };

  const checkboxStyling: CSSProperties = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "20%",
    height: "25px",
    boxSizing: "border-box",
    cursor: "pointer",
  };

  const labelStyling: CSSProperties = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
    minWidth: "70px",
  };

  const buttonStyling: CSSProperties = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
  };

  const buttonHoverStyling: CSSProperties = {
    backgroundColor: "#0056b3",
  };

  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <h2
          style={{ paddingBottom: "8px", color: "#333", textAlign: "center" }}
        >
          <strong>Add New Layer</strong>
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={labelStyling}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            style={boxStyling}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="label" style={labelStyling}>
            Label:
          </label>
          <input
            type="text"
            id="label"
            name="label"
            onChange={formik.handleChange}
            value={formik.values.label}
            style={boxStyling}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="longitude" style={labelStyling}>
            Longitude:
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            onChange={formik.handleChange}
            value={formik.values.longitude}
            style={boxStyling}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="latitude" style={labelStyling}>
            Latitude:
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            onChange={formik.handleChange}
            value={formik.values.latitude}
            style={boxStyling}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="zoom" style={labelStyling}>
            Zoom:
          </label>
          <input
            type="number"
            id="zoom"
            name="zoom"
            onChange={formik.handleChange}
            value={formik.values.zoom}
            style={boxStyling}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="bearing" style={labelStyling}>
            Bearing:
          </label>
          <input
            type="number"
            id="bearing"
            name="bearing"
            onChange={formik.handleChange}
            value={formik.values.bearing}
            style={boxStyling}
          />
        </div>
        {/* Got rid of this cause I don't think we need to show this
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="topLayerClass" style={labelStyling}>Top Layer Class:</label>
        <input disabled type="text" id="topLayerClass" name="topLayerClass" onChange={formik.handleChange} value={formik.values.topLayerClass} style={boxStyling} />
      </div> */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="infoId" style={labelStyling}>
            Info ID:
          </label>
          <input
            type="text"
            id="infoId"
            name="infoId"
            onChange={formik.handleChange}
            value={formik.values.infoId}
            style={boxStyling}
          />
        </div>
        {/* Dropdown for Type */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="type" style={labelStyling}>
            Type:
          </label>
          <select
            id="type"
            name="type"
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedType(e.target.value); // Set selected type
            }}
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

        {selectedType === "fill" && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="fillColor" style={labelStyling}>
                Fill Color:
              </label>
              <input
                type="color"
                id="fillColor"
                name="fillColor"
                onChange={formik.handleChange}
                value={formik.values.fillColor}
                style={{ ...boxStyling, padding: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="fillOpacity" style={labelStyling}>
                Fill Opacity:
              </label>
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
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="fillOutlineColor" style={labelStyling}>
                Fill Outline Color:
              </label>
              <input
                type="color"
                id="fillOutlineColor"
                name="fillOutlineColor"
                onChange={formik.handleChange}
                value={formik.values.fillOutlineColor}
                style={{ ...boxStyling, padding: "5px" }}
              />
            </div>
          </>
        )}

        {selectedType === "symbol" && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="textColor" style={labelStyling}>
                Text Color:
              </label>
              <input
                type="color"
                id="textColor"
                name="textColor"
                onChange={formik.handleChange}
                value={formik.values.textColor}
                style={{ ...boxStyling, padding: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="textHaloColor" style={labelStyling}>
                Text Halo Color:
              </label>
              <input
                type="color"
                id="textHaloColor"
                name="textHaloColor"
                onChange={formik.handleChange}
                value={formik.values.textHaloColor}
                style={{ ...boxStyling, padding: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="textHaloWidth" style={labelStyling}>
                Text Halo Width:
              </label>
              <input
                type="number"
                id="textHaloWidth"
                name="textHaloWidth"
                onChange={formik.handleChange}
                value={formik.values.textHaloWidth}
                min="0"
                max="10"
                step="0.5"
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="layout[text-field]" style={labelStyling}>
                Text Field:
              </label>
              <input
                type="text"
                id="layout[text-field]"
                name="layout[text-field]"
                onChange={formik.handleChange}
                value={formik.values.layout["text-field"]}
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="layout[icon-image]" style={labelStyling}>
                Icon Image:
              </label>
              <input
                type="text"
                id="layout[icon-image]"
                name="layout[icon-image]"
                onChange={formik.handleChange}
                value={formik.values.layout["icon-image"]}
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="layout[icon-size]" style={labelStyling}>
                Icon Size:
              </label>
              <input
                type="number"
                id="layout[icon-size]"
                name="layout[icon-size]"
                onChange={formik.handleChange}
                value={formik.values.layout["icon-size"]}
                min="0"
                step="0.1"
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="layout[text-size]" style={labelStyling}>
                Text Size:
              </label>
              <input
                type="number"
                id="layout[text-size]"
                name="layout[text-size]"
                onChange={formik.handleChange}
                value={formik.values.layout["text-size"]}
                min="0"
                step="1"
                style={boxStyling}
              />
            </div>
          </>
        )}

        {selectedType === "circle" && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="circleColor" style={labelStyling}>
                Circle Color:
              </label>
              <input
                type="color"
                id="circleColor"
                name="circleColor"
                onChange={formik.handleChange}
                value={formik.values.circleColor}
                style={{ ...boxStyling, padding: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="circleOpacity" style={labelStyling}>
                Circle Opacity:
              </label>
              <input
                type="number"
                id="circleOpacity"
                name="circleOpacity"
                onChange={formik.handleChange}
                value={formik.values.circleOpacity}
                min="0"
                max="1"
                step="0.1"
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="circleRadius" style={labelStyling}>
                Circle Radius:
              </label>
              <input
                type="number"
                id="circleRadius"
                name="circleRadius"
                onChange={formik.handleChange}
                value={formik.values.circleRadius}
                min="0"
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="circleStrokeColor" style={labelStyling}>
                Circle Stroke Color:
              </label>
              <input
                type="color"
                id="circleStrokeColor"
                name="circleStrokeColor"
                onChange={formik.handleChange}
                value={formik.values.circleStrokeColor}
                style={{ ...boxStyling, padding: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="circleStrokeWidth" style={labelStyling}>
                Circle Stroke Width:
              </label>
              <input
                type="number"
                id="circleStrokeWidth"
                name="circleStrokeWidth"
                onChange={formik.handleChange}
                value={formik.values.circleStrokeWidth}
                min="0"
                style={boxStyling}
              />
            </div>
          </>
        )}

        {selectedType === "line" && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="lineColor" style={labelStyling}>
                Line Color:
              </label>
              <input
                type="color"
                id="lineColor"
                name="lineColor"
                onChange={formik.handleChange}
                value={formik.values.lineColor}
                style={{ ...boxStyling, padding: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="lineWidth" style={labelStyling}>
                Line Width:
              </label>
              <input
                type="number"
                id="lineWidth"
                name="lineWidth"
                onChange={formik.handleChange}
                value={formik.values.lineWidth}
                min="0"
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="lineBlur" style={labelStyling}>
                Line Blur:
              </label>
              <input
                type="number"
                id="lineBlur"
                name="lineBlur"
                onChange={formik.handleChange}
                value={formik.values.lineBlur}
                min="0"
                style={boxStyling}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="lineOpacity" style={labelStyling}>
                Line Opacity:
              </label>
              <input
                type="number"
                id="lineOpacity"
                name="lineOpacity"
                onChange={formik.handleChange}
                value={formik.values.lineOpacity}
                min="0"
                max="1"
                step="0.1"
                style={boxStyling}
              />
            </div>
          </>
        )}
        {/* Dropdown for Source Type */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="sourceType" style={labelStyling}>
            Source Type:
          </label>
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

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="sourceUrl" style={labelStyling}>
            Source URL:
          </label>
          <input
            type="text"
            id="sourceUrl"
            name="sourceUrl"
            onChange={formik.handleChange}
            value={formik.values.sourceUrl}
            style={boxStyling}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="sourceId" style={labelStyling}>
            Source ID:
          </label>
          <input
            type="text"
            id="sourceId"
            name="sourceId"
            onChange={formik.handleChange}
            value={formik.values.sourceId}
            style={boxStyling}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="sourceLayer" style={labelStyling}>
            Source Layer:
          </label>
          <input
            type="text"
            id="sourceLayer"
            name="sourceLayer"
            onChange={formik.handleChange}
            value={formik.values.sourceLayer}
            style={boxStyling}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="iconColor" style={labelStyling}>
            Icon Color:
          </label>
          <div id="sourceLayer">
            <ColorPickerButton
              callback={(newColor: string) => {
                formik.setValues({
                  ...formik.values,
                  iconColor: newColor,
                });
              }}
            ></ColorPickerButton>
          </div>

          <label htmlFor="iconType" style={labelStyling}>
            Icon Type:
          </label>
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

          {formik.values.iconColor && formik.values.iconType && (
            <>
              <p>Result: </p>
              <PreviewIcon
                iconType={formik.values.iconType}
                color={formik.values.iconColor}
              ></PreviewIcon>
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="hover" style={labelStyling}>
            Hover:
          </label>
          <input
            type="checkbox"
            id="hover"
            name="hover"
            onChange={formik.handleChange}
            checked={formik.values.hover}
            style={checkboxStyling}
          />
        </div>

        {formik.values.hover && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="newGroupLabel" style={labelStyling}>
                Hover Popup Style:
              </label>
              <select
                id="hoverStyle"
                name="hoverStyle"
                onChange={formik.handleChange}
                value={formik.values.hoverStyle}
                style={boxStyling}
              >
                <option value="">Select Color</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="light-red">Light Red</option>
                <option value="red">Red</option>
                <option value="light-green">Light Green</option>
                <option value="green">Green</option>
                <option value="light-blue">Light Blue</option>
                <option value="blue">Blue</option>
                <option value="light-purple">Light Purple</option>
                <option value="purple">Purple</option>
                <option value="white">White</option>
                <option value="light-grey">Light Grey</option>
                <option value="grey">Grey</option>
              </select>
            </div>
            <FieldArray
              name="hoverContent"
              render={(arrayHelpers) => (
                <div style={{ marginBottom: "15px" }}>
                  {formik.values.hoverContent.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <label
                        htmlFor={`label${index}`}
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        Label:
                      </label>
                      <input
                        type="text"
                        id={`hoverContent.${index}.label`}
                        name={`hoverContent.${index}.label`}
                        onChange={formik.handleChange}
                        value={item.label}
                        style={boxStyling}
                      />

                      <label
                        htmlFor={`type${index}`}
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        Type:
                      </label>
                      <select
                        id={`hoverContent.${index}.type`}
                        name={`hoverContent.${index}.type`}
                        onChange={formik.handleChange}
                        value={item.type}
                        style={boxStyling}
                      >
                        <option value="">Select Type</option>
                        <option value="NAME">Name</option>
                        <option value="LOT">Lot</option>
                        <option value="DATE-START">Start Date</option>
                        <option value="DATE-END">End Date</option>
                        <option value="ADDRESS">Address</option>
                      </select>

                      {/* Button to remove this item */}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        style={{
                          marginBottom: "10px",
                          padding: "8px",
                          display: "flex",
                          backgroundColor: "#e22222",
                          color: "white",
                          borderRadius: "4px",
                          fontSize: "30px",
                          height: "40px",
                          width: "40px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ label: "", type: "" })}
                    style={{
                      padding: "8px",
                      backgroundColor: "#008000",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                  >
                    New Popup Field
                  </button>
                </div>
              )}
            />
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="click" style={labelStyling}>
            Click:
          </label>
          <input
            type="checkbox"
            id="click"
            name="click"
            onChange={formik.handleChange}
            checked={formik.values.click}
            style={checkboxStyling}
          />
        </div>

        {formik.values.click && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="newGroupLabel" style={labelStyling}>
                Click Popup Style:
              </label>
              <select
                id="clickStyle"
                name="clickStyle"
                onChange={formik.handleChange}
                value={formik.values.clickStyle}
                style={boxStyling}
              >
                <option value="">Select Color</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="light-red">Light Red</option>
                <option value="red">Red</option>
                <option value="light-green">Light Green</option>
                <option value="green">Green</option>
                <option value="light-blue">Light Blue</option>
                <option value="blue">Blue</option>
                <option value="light-purple">Light Purple</option>
                <option value="purple">Purple</option>
                <option value="white">White</option>
                <option value="light-grey">Light Grey</option>
                <option value="grey">Grey</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="newGroupName" style={labelStyling}>
                Click Popup Header Label:
              </label>
              <input
                type="text"
                id="clickHeader"
                name="clickHeader"
                onChange={formik.handleChange}
                value={formik.values.clickHeader}
                style={boxStyling}
              />
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="time" style={labelStyling}>
            Time:
          </label>
          <input
            type="checkbox"
            id="time"
            name="time"
            onChange={formik.handleChange}
            checked={formik.values.time}
            style={checkboxStyling}
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
        <button
          style={buttonStyling}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyling.backgroundColor!)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonStyling.backgroundColor!)
          }
          type="submit"
        >
          Submit
        </button>
      </form>
    </FormikProvider>
  );
}
