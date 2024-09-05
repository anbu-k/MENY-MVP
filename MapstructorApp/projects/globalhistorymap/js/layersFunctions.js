function setupLayerEvents(map, layers) {
  layers.forEach((layer) => {
    let hoveredId = null; // Variable to store the id of the hovered feature
    
	console.log(layer.id);
	
	if(layer.id == "global") {
		setTimeout(function () {
            $("#global_layer_items").prop("disabled", false);
            $(".global_layer").prop("disabled", false);
		}, 750);
	}
    
	if(layer.id == "global-places") {
		setTimeout(function () {
            $("#global_labels_items").prop("disabled", false);
            $(".global-labels").prop("disabled", false);
        }, 250);
    }
	
	
    if (layer.id !== "global-places")
      map.on("mouseenter", layer.id, (e) => {
        //map.getCanvas().style.cursor = "pointer";

        // Optionally, you might want to show a popup when hovering
        // This depends on how you've structured your popups
        const popup = getPopupByName(layer.popup);
        if (popup) {
          popup.setLngLat(e.lngLat).addTo(map);
        }
    });
    
	
    map.on(
      layer.id === "global-places" ? "mouseenter" : "mousemove",
      layer.id,
      (e) => {
		  
		map.getCanvas().style.cursor = "pointer";
		  
        if (e.features.length > 0) {
			/*
		  console.log(layer); // output
		  console.log(layer.id); // output
		  console.log(layer.sourceId); 
		  console.log(e.features[0].properties);
		  console.log(e.features[0].id);
		  console.log(e.features[0].layer['source-layer']);
		  console.log(e.features[0].properties.fid);
		  
		  layer.sourceId = e.features[0].layer['source-layer'];
		  */
		  
          if (hoveredId) {
            // Reset the previous feature's state
            map.setFeatureState(
              { source: layer.id, id: hoveredId, sourceLayer: layer.sourceId },
              { hover: false }
            );
          }
          
		  // layer.id === "output" ? e.features[0].properties.fid :
          hoveredId = e.features[0].id;

          // Set the new feature's state
          map.setFeatureState(
            { source: layer.id,  id: hoveredId, sourceLayer: layer.sourceId },
            { hover: true }
          );
          if (layer.id === "global-places") {
            var coordinates = e.features[0].geometry.coordinates.slice();

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            getPopupByName(layer.popup)
              .setLngLat(coordinates)
              .setHTML(generatePopupContent(layer.id, e.features, map))
              .addTo(map);
          } else {
            // Update popup content if needed
            const popup = getPopupByName(layer.popup);
            if (popup) {
              const content = generatePopupContent(layer.id, e.features, map);
			  //console.log(content);
              popup.setLngLat(e.lngLat).setHTML(content);
            }
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

function addMapLayers(map, layers, date) {
  layers.forEach((layer) => {
    if (map === beforeMap) addMapLayer(map, getLayer(layer.id), date);
    else addMapLayer(map, getLayer(layer.id), date);
  });
}

function addAllLayers(yr, date) {
  ["", ""].forEach((position,index) => {
    const map = index === 0 ? beforeMap : afterMap;
    const popupMap = index === 0 ? "beforeMap" : "afterMap";

    //#region - Lot events and dutch grants
    removeMapSourceLayer(map, [
      //{ type: "layer", id: `lot_events-bf43eb${index !== 1 ? "-left" : "-right"}` },
      //{ type: "source", id: "lot_events-bf43eb" },
      { type: "layer", id: `germany` },
      { type: "source", id: "geacron_shps_testing-89qva4" },
      { type: "layer", id: `germany-lines` },
      { type: "source", id: "geacron_shps_testing-89qva4" },
    ]);
    addMapLayers(
      map,
      [
        { id: `germany-highlighted` },
        { id: `germany` },
        { id: `germany-lines` },
        { id: `global-highlighted` },
        { id: `global` },
        { id: `global-lines` },
		{ id: `global-places` },
        { id: `global-labels` },
      ],
      date
    );
    setupLayerEvents(map, [
      {
        id: `germany`,
        popup: `${popupMap}DutchGrantPopUp`,       // ???
        sourceId: "geacron_shps_testing-89qva4",
      },
      {
        id: `global`,
        popup: `${popupMap}DutchGrantPopUp`,       // ???
        sourceId: "geacron_mapbox",
      },
    ]);
    // #endregion

    // #region - Castello Tax Lots
    //addMapLayer(map, getLayer(`global-places`));

    setupLayerEvents(map, [
      {
        id: `global-places`,
        popup: `${popupMap}PlacesPopUp`,
        sourceId: "geacron_labels-01fr13",
      },
    ]);
    //#endregion

    /*
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
	*/
  });
}
