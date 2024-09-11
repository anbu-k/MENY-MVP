"use strict";
map.on("draw.create", function (e) {
    handleDrawCreate(e);
    populateIdsTrayUnderLayers();
});
map.on("draw.delete", function (e) {
    var feature = e.features[0];
    var id = feature.id;
    var mapLayers = map.getStyle().layers;
    // Optional: Display layer names on the map
    var layer = mapLayers.find(function (layer) {
        return layer.id.includes(id);
    });
    if (layer) {
        map.removeLayer(layer.id);
    }
    var parentLayer = layers.find(function (layer) {
        return !!layer.features.find(function (feature) { return feature.id === id; });
    });
    var index = parentLayer.features.findIndex(function (feature) { return feature.id === id; });
    console.log("index", index);
    parentLayer.features = parentLayer.features.slice(0, index).concat(parentLayer.features.slice(index + 1));
    saveProjectToFirebase();
});
function toggleAddLayerLinkSection(e) {
    e.preventDefault();
    var section = document.getElementById("add-layer-link-section");
    section.style.display = section.style.display === "none" ? "block" : "none";
}
function hideModalOuterDiv(e) {
    var modal = document.getElementById("modal");
    if (e.target.id === "modal") {
        modal.style.display = "none";
    }
}
function hideModalInnerDiv(e) {
    e.stopPropagation(); // Prevent event bubbling to the outer div
}
function showLayerModal(e) {
    e.preventDefault();
    var modal = document.getElementById("modal");
    modal.style.display = "grid";
    document.getElementById("add-layer-modal").style.display = "block";
    document.getElementById("load-project-modal").style.display = "none";
}
function showLoadProjectModal(e) {
    e.preventDefault();
    var modal = document.getElementById("modal");
    modal.style.display = "grid";
    document.getElementById("load-project-modal").style.display = "block";
    document.getElementById("add-layer-modal").style.display = "none";
}
function handleLabelInputChange(e) {
    var newLabel = e.target.value;
    var featureId = featuresSelected[0].id;
    var feature = layers.find(function (_a) {
        var id = _a.id;
        return id === currentLayerId;
    }).features.find(function (_a) {
        var id = _a.id;
        return id === featureId;
    });
    feature.properties.label = newLabel;
    drawControls.get(featureId).properties.label = newLabel;
    createOrUpdateLabel(feature);
    saveProjectToFirebase();
}
function handleInfoInputChange(e) {
    var info = e.target.value;
    var featureId = featuresSelected[0].id;
    var feature = layers.find(function (_a) {
        var id = _a.id;
        return id === currentLayerId;
    }).features.find(function (_a) {
        var id = _a.id;
        return id === featureId;
    });
    feature.properties.info = info;
    drawControls.get(featureId).properties.info = info;
    // createOrUpdateLabel(feature)
    saveProjectToFirebase();
}
function handleInfoCharacterChange(e) {
    var info = document.getElementById("feature-info-value").value;
    console.log(info);
    document.getElementById("min-info-length").innerText = info.length;
}
function createOrUpdateLabel(feature) {
    var coordinates;
    var label = feature.properties.label;
    var id = generateRandomString(10) + "+--+" + feature.id;
    console.log(id);
    // Determine the coordinates based on the geometry type
    if (feature.geometry.type === "Point") {
        coordinates = feature.geometry.coordinates;
    }
    else if (feature.geometry.type === "LineString") {
        // Use the midpoint of the LineString for the label position
        var lineCoordinates = feature.geometry.coordinates;
        var midpointIndex = Math.floor(lineCoordinates.length / 2);
        coordinates = lineCoordinates[midpointIndex];
    }
    else {
        // Calculate the centroid of the polygon for the label position
        var polygonCoordinates = feature.geometry.coordinates[0];
        coordinates = calculatePolygonCentroid(polygonCoordinates);
    }
    var labelLayerSource = {
        id: id,
        type: "symbol",
        source: {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {
                            title: label,
                            icon: "circle",
                        },
                        geometry: {
                            type: "Point",
                            coordinates: coordinates,
                        },
                    },
                ],
            },
        },
        layout: {
            "text-font": ["Asap Medium"],
            "text-field": "{title}",
            "text-size": 18,
            "text-offset": [0, 1.5],
            visibility: "visible",
        },
        paint: {
            "text-color": "#8B0000",
            "text-halo-width": 3,
            "text-halo-blur": 2,
            "text-halo-color": "#ffffff",
        },
    };
    if (map.getLayer(label)) {
        map.getSource(label).setData(labelLayerSource.source.data);
    }
    else {
        map.addLayer(labelLayerSource);
    }
}
function calculatePolygonCentroid(coordinates) {
    var x = 0, y = 0, area = 0, factor;
    var numPoints = coordinates.length;
    for (var i_1 = 0; i_1 < numPoints - 1; i_1++) {
        var x1 = coordinates[i_1][0];
        var y1 = coordinates[i_1][1];
        var x2 = coordinates[i_1 + 1][0];
        var y2 = coordinates[i_1 + 1][1];
        factor = (x1 * y2 - x2 * y1);
        x += (x1 + x2) * factor;
        y += (y1 + y2) * factor;
        area += factor;
    }
    area /= 2;
    x /= (6 * area);
    y /= (6 * area);
    return [x, y];
}
