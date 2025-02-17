"use strict";
function setupLayerEvents(map, layers) {
    layers.forEach(function (layer) {
        var hoveredId = null; // Variable to store the id of the hovered feature
        if (layer.id !== "places-right")
            map.on("mouseenter", layer.id, function (e) {
                map.getCanvas().style.cursor = "pointer";
                // Optionally, you might want to show a popup when hovering
                // This depends on how you've structured your popups
                var popup = getPopupByName(layer.popup);
                if (popup) {
                    popup.setLngLat(e.lngLat).addTo(map);
                }
            });
        map.on(layer.id === "places-right" ? "mouseenter" : "mousemove", layer.id, function (e) {
            if (e.features.length > 0) {
                if (hoveredId) {
                    // Reset the previous feature's state
                    map.setFeatureState({ source: layer.id, id: hoveredId, sourceLayer: layer.sourceId }, { hover: false });
                }
                hoveredId = e.features[0].id;
                // Set the new feature's state
                map.setFeatureState({ source: layer.id, id: hoveredId, sourceLayer: layer.sourceId }, { hover: true });
                if (layer.id === "places-right") {
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    getPopupByName(layer.popup)
                        .setLngLat(coordinates)
                        .setHTML(generatePopupContent(layer.id, e.features))
                        .addTo(map);
                }
                else {
                    // Update popup content if needed
                    var popup = getPopupByName(layer.popup);
                    if (popup) {
                        var content = generatePopupContent(layer.id, e.features);
                        popup.setLngLat(e.lngLat).setHTML(content);
                    }
                }
            }
        });
        map.on("mouseleave", layer.id, function () {
            map.getCanvas().style.cursor = "";
            if (hoveredId) {
                // Reset the hovered feature's state when the mouse leaves
                map.setFeatureState({ source: layer.id, id: hoveredId, sourceLayer: layer.sourceId }, { hover: false });
                hoveredId = null;
            }
            // Close the popup when the mouse leaves
            var popup = getPopupByName(layer.popup);
            if (popup && popup.isOpen()) {
                popup.remove();
            }
        });
    });
}
function addMapLayers(map, layers, date) {
    layers.forEach(function (layer) {
        if (map === beforeMap)
            addMapLayer(map, getLayer(layer.id), date);
        else
            addMapLayer(map, getLayer(layer.id), date);
    });
}
function addAllLayers(yr, date) {
    ["", ""].forEach(function (position, index) {
        var map = index === 0 ? beforeMap : afterMap;
        var popupMap = index === 0 ? "beforeMap" : "afterMap";
        //#region - Lot events and dutch grants
        removeMapSourceLayer(map, [
            { type: "layer", id: "lot_events-bf43eb" },
            { type: "source", id: "lot_events-bf43eb" },
            { type: "layer", id: "dutch_grants-5ehfqe" },
            { type: "source", id: "dutch_grants-5ehfqe" },
            { type: "layer", id: "grant-lots-lines" },
            { type: "source", id: "dutch_grants_lines-0y4gkx" },
        ]);
        addMapLayers(map, [
            { id: "dutch_grants-5ehfqe-highlighted" },
            { id: "dutch_grants-5ehfqe" },
            { id: "lot_events-bf43eb" },
            { id: "grant-lots-lines" },
            { id: "grant-lots" },
        ], date);
        setupLayerEvents(map, [
            {
                id: "dutch_grants-5ehfqe",
                popup: "".concat(popupMap, "DutchGrantPopUp"),
                sourceId: "dutch_grants-5ehfqe",
            },
            {
                id: "lot_events-bf43eb",
                popup: "".concat(popupMap, "PopUp"),
                sourceId: "lot_events-bf43eb",
            },
        ]);
        // #endregion
        // #region - Castello Tax Lots
        addMapLayer(map, getLayer("places"));
        setupLayerEvents(map, [
            {
                id: "places",
                popup: "".concat(popupMap, "PlacesPopUp"),
                sourceId: "taxlots-cpwvol",
            },
        ]);
        //#endregion
        // #region - Long Island Tribes
        addMapLayer(map, getLayer("native-groups-lines"));
        addMapLayer(map, getLayer("native-groups-area"));
        addMapLayer(map, getLayer("native-groups-area-highlighted"));
        addMapLayer(map, getLayer("native-groups-labels"));
        setupLayerEvents(map, [
            {
                id: "native-groups-area",
                popup: "".concat(popupMap, "NativeGroupsPopUp"),
                sourceId: "indian_areas_long_island-50h2dj",
            },
        ]);
        //#endregion
    });
}
