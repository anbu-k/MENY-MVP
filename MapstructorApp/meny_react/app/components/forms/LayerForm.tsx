import { useFormik } from "formik";
import { CSSProperties, useState } from "react";

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

export default function LayerForm() {
  const [showNewSourceInput, setShowNewSourceInput] = useState(false);
  const [showPaintOptions, setShowPaintOptions] = useState(false); // State to control paint options visibility

  const formik = useFormik({
    initialValues: {
      layerName: "",
      type: "" as LayerType,
      sourceType: "" as SourceType,
      sourceUrl: "",
      sourceId: "",
      sourceLayer: "",
      // paint properties - fill
      fillColor: "#e3ed58", // Default fill color
      fillOpacity: 0.5, // Default opacity
      fillOutlineColor: "#FF0000", // Default outline color
      // paint properties - symbol
      textColor: "#000080", // Default text color (for symbol layers)
      textHaloColor: "#ffffff", // Default text halo color
      textHaloWidth: 2, // Default text halo width
      // paint properties - circle
      circleColor: "#097911", // Default values
      circleOpacity: 1,
      circleRadius: 5,
      circleStrokeColor: "#0000ee",
      circleStrokeWidth: 2,
      // Line Paint Properties
      lineColor: "#ff9900", // Default values
      lineWidth: 15,
      lineBlur: 0,
      lineOpacity: 1.0,
    },

    onSubmit: async (values) => {
      // Formats the paint property based on layer type currently fill, symbol, circle, or line
      const paint: any = {};
      if (values.type === "fill") {
        paint["fill-color"] = values.fillColor;
        paint["fill-opacity"] = values.fillOpacity;
        paint["fill-outline-color"] = values.fillOutlineColor;
      } else if (values.type === "symbol") {
        paint["text-color"] = values.textColor;
        paint["text-halo-color"] = values.textHaloColor;
        paint["text-halo-width"] = values.textHaloWidth;
      } else if (values.type === "circle") {
        paint["circle-color"] = values.circleColor;
        paint["circle-opacity"] = values.circleOpacity;
        paint["circle-radius"] = values.circleRadius;
        paint["circle-stroke-color"] = values.circleStrokeColor;
        paint["circle-stroke-width"] = values.circleStrokeWidth;
      } else if (values.type === "line") {
        paint["line-color"] = values.lineColor;
        paint["line-width"] = values.lineWidth;
        paint["line-blur"] = values.lineBlur;
        paint["line-opacity"] = values.lineOpacity;
      }

      const formattedLayer = {
        ...values,
        paint,
      };

      try {
        const response = await fetch("api/layer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedLayer),
        });
        alert("Layer added successfully");
        formik.resetForm();
      } catch (error) {
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

  const labelStyling: CSSProperties = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
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

  const paintHeaderStyle: CSSProperties = {
    ...labelStyling,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2 style={{ paddingBottom: "8px", color: "#333", textAlign: "center" }}>
        <strong>Add New Layer</strong>
      </h2>

      {/* Layer Name Input */}
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="layerName" style={labelStyling}>
          Layer Name:
        </label>
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
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="type" style={labelStyling}>
          Type:
        </label>
        <select
          id="type"
          name="type"
          onChange={(e) => {
            formik.handleChange(e);
            setShowPaintOptions(
              ["fill", "symbol", "circle", "line"].includes(e.target.value)
            ); // Shows paint options for fill, symbol, circle, and line
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

      {/* Source URL Input */}
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

      {/* Source ID Input */}
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

      {/* Source Layer Input */}
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

      {/* Paint Options Header */}
      <div
        style={paintHeaderStyle}
        onClick={() => setShowPaintOptions(!showPaintOptions)}
      >
        <span>Paint Options</span>
        <span>{showPaintOptions ? "▲" : "▼"}</span>
      </div>

      {/*  Paint Settings based on the Layer Type */}
      {showPaintOptions && (
        <div style={{ marginBottom: "20px" }}>
          {formik.values.type === "fill" && (
            <>
              {/* Background Fill Colors Picker */}
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="fillColor" style={labelStyling}>
                  Background Fill Color:
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

              {/* Fill Opacity Input */}
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

              {/* Outline Color Picker */}
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="fillOutlineColor" style={labelStyling}>
                  Outline Color:
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

          {/* Symbol Layer Options */}
          {formik.values.type === "symbol" && (
            <>
              {/* Text Color */}
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

              {/* Text Halo Color */}
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

              {/* Text Halo Width */}
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
            </>
          )}
          {/* Circle Layer Options */}
          {formik.values.type === "circle" && (
            <>
              {/* Circle Color */}
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

              {/* Circle Opacity */}
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

              {/* Circle Radius */}
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
                  max="50"
                  step="1"
                  style={boxStyling}
                />
              </div>

              {/* Circle Stroke Color */}
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

              {/* Circle Stroke Width */}
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
                  max="10"
                  step="1"
                  style={boxStyling}
                />
              </div>
            </>
          )}

          {/* Line Layer Options */}
          {formik.values.type === "line" && (
            <>
              {/* Line Color */}
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

              {/* Line Width */}
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
                  max="50"
                  step="1"
                  style={boxStyling}
                />
              </div>

              {/* Line Blur */}
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
                  max="10"
                  step="1"
                  style={boxStyling}
                />
              </div>

              {/* Line Opacity */}
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
        </div>
      )}

      <button
        style={{ ...buttonStyling, marginTop: "40px" }}
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
  );
}
