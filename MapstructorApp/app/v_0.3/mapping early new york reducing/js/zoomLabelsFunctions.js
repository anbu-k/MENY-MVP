/**
 * creates a map label as a GeoJSON feature with specific properties for display and interactivity
 * 
 * @param {string} title - the title of the label to be displayed
 * @param {Array} coordinates - the geographic coordinates, longitude and latitude where the label will be placed
 * @param {number} minZoom - the optimal minimum zoom level at which the label will become visible
 * @returns {object} - returns an object representing the label
 */
function createLabel(title, coordinates, minZoom = null) {
    return {
      // Ggnerates a unique ID for the label by transforming the title to lowercase and replacing spaces with hyphens
      id: `label-${title.toLowerCase().replace(/\s+/g, '-')}`,
      type: "symbol",
        // defines the data source as GeoJSON, specifying the label's coordinates and properties
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: { title, icon: "circle" },
            geometry: { type: "Point", coordinates }
          }],
        },
      },
      // conditionally includes the minzoom property if a minZoom value is provided.
      ...(minZoom && { minzoom: minZoom }),

      // defines the layout properties for the label, including text font, size, and visibility.
      layout: {
        visibility: "visible",
        "text-font": ["Asap Medium"],
        "text-field": "{title}",
        "text-size": 18,
      },
      paint: {
        "text-color": "#000000",
        "text-halo-width": 3,
        "text-halo-blur": 2,
        "text-halo-color": "#ffffff",
        "text-opacity": {
          default: 1,
          stops: [[6, 0], [6.5, 1]],
        },
      },
    };
  }
  
  /*
  Function to Add Interactivity to Labels:
  Create a function to add event listeners for interactivity (mouseenter, mouseleave, click):
  */
  
  /**
   * adds interactivity (hover and click behavior) to a specific label on the map
   * 
   * @param {*} map - the map instance where the label is added
   * @param {*} labelObject - the label object created by createlabel, which contains properties for the label
   * @param {*} boundsName - the name of the bounds area to zoom to when the label is clicked
   */
  function addInteractivityToLabel(map, labelObject, boundsName) {
    const labelId = labelObject.id;
  
    // map.on("mouseenter", labelId, function () {
    //   map.setPaintProperty(labelId, "text-color", "#ff0000");
    //   map.getCanvas().style.cursor = "pointer";
    // });
  
    // map.on("mouseleave", labelId, function () {
    //   map.setPaintProperty(labelId, "text-color", "#482525");
    //   map.getCanvas().style.cursor = "";
    // });
  
    // map.on("click", labelId, function () {
    //   zoom_labels_click_ev = true;
    //   zoomtobounds(boundsName);
    // });
  }
  