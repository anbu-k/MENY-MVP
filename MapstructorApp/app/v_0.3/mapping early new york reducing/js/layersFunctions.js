/**
 * this class sets up event listeners for each layer, allowing for interactions such as hover effects & displaying popups
 * 
 * @param {object} map - The map instance
 * @param {Array} layers - An array of layer objects, each containing properties
 */
function setupLayerEvents(map, layers) {
 // iterates through each layer to add event listeners
  layers.forEach((layer) => {
    let hoveredId = null; // Variable to store the id of the hovered feature
    if (layer.id !== "places-right")
      map.on("mouseenter", layer.id, (e) => {
        map.getCanvas().style.cursor = "pointer";

        // Optionally, you might want to show a popup when hovering
        // This depends on how you've structured your popups
        // const popup = getPopupByName(layer.popup);
        // if (popup) {
        //   popup.setLngLat(e.lngLat).addTo(map);
        // }
      });

    map.on(
      "mousemove",
      layer.id,
      (e) => {
        if (e.features.length > 0) {
          if (hoveredId) {
            // Reset the previous feature's state
            map.setFeatureState(
              { source: layer.id, id: hoveredId, sourceLayer: layer.sourceId },
              { hover: false }
            );
          }
          console.log(e.features[0]);
          hoveredId = e.features[0].id;

          // Set the new feature's state
          map.setFeatureState(
            { source: layer.id, id: hoveredId, sourceLayer: layer.sourceId },
            { hover: true }
          );
          const popup = getPopupByName(layer.popup);
          console.log("Popup before content:");
          console.log(popup);
          if (popup) {
            const content = generatePopupContent(layer.id, e.features);
            popup.setLngLat(e.lngLat).setHTML(content).addTo(map);
            console.log("Popup after content:");
            console.log(popup);
          }
        }
      }
    );

    map.on("mouseleave", layer.id, () => {
      map.getCanvas().style.cursor = "";

      if (hoveredId) {
        // Reset the hovered feature's state when the mouse leaves
        map.setFeatureState(
          { source: layer.id, id: hoveredId, sourceLayer: layer.sourceId },
          { hover: false }
        );
        hoveredId = null;
      }

      // Close the popup when the mouse leaves
      const popup = getPopupByName(layer.popup);
      if (popup && popup.isOpen()) {
        popup.remove();
      }
    });
  });
}

/**
 * Adds specified map layers to the given map instance
 * 
 * @param {object} map - the map instance to which the layers will be added
 * @param {Array} layers - an array of layer configuration objects to be added to the map
 * @param {string} date - optional data parameter to configure the layers
 */
function addMapLayers(map, layers, date) {
  layers.forEach((layer) => {
    if (map === beforeMap) addMapLayer(map, getLayer(layer.id), date);
    else addMapLayer(map, getLayer(layer.id), date);
  });
}

/**
 * adds and sets up all the necessary map layers for the given year and date
 * 
 * @param {number} yr - the year for which the layers should be added
 * @param {string} date - the date parameter used to filter or adjust layer content
 */
function addAllLayers(yr, date) {
  // iterates through the maps (beforeMap and afterMap) to add and configure layers for each
  ["", ""].forEach((position,index) => {
    const map = index === 0 ? beforeMap : afterMap; // determines which map (vefore or after) is being configured
    const popupMap = index === 0 ? "beforeMap" : "afterMap";

    //#region - Lot events and dutch grants
    removeMapSourceLayer(map, [
      { type: "layer", id: `lot_events-bf43eb` },
      { type: "source", id: "lot_events-bf43eb" },
      { type: "layer", id: `dutch_grants-5ehfqe` },
      { type: "source", id: "dutch_grants-5ehfqe" },
      { type: "layer", id: `grant-lots-lines` },
      { type: "source", id: "dutch_grants_lines-0y4gkx" },
    ]);
    addMapLayers(
      map,
      [
        { id: `dutch_grants-5ehfqe-highlighted` },
        { id: `dutch_grants-5ehfqe` },
        { id: `lot_events-bf43eb` },
        { id: `grant-lots-lines` },
        { id: `grant-lots` },
      ],
      date
    );
    setupLayerEvents(map, [
      {
        id: `dutch_grants-5ehfqe`,
        popup: `${popupMap}DutchGrantPopUp`,
        sourceId: "dutch_grants-5ehfqe",
      },
      {
        id: `lot_events-bf43eb`,
        popup: `${popupMap}PopUp`,
        sourceId: "lot_events-bf43eb",
      },
    ]);
    // #endregion

    // #region - Castello Tax Lots
    addMapLayer(map, getLayer(`places`));

    setupLayerEvents(map, [
      {
        id: `places`,
        popup: `${popupMap}PlacesPopUp`,
        sourceId: "taxlots-cpwvol",
      },
    ]);
    //#endregion

    // #region - Long Island Tribes
    addMapLayer(map, getLayer(`native-groups-lines`));
    addMapLayer(map, getLayer(`native-groups-area`));
    addMapLayer(
      map,
      getLayer(`native-groups-area-highlighted`)
    );
    addMapLayer(map, getLayer(`native-groups-labels`));

    setupLayerEvents(map, [
      {
        id: `native-groups-area`,
        popup: `${popupMap}NativeGroupsPopUp`,
        sourceId: "indian_areas_long_island-50h2dj",
      },
    ]);
    //#endregion
  });
}
