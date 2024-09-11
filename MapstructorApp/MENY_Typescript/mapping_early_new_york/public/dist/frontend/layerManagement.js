"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function handleDrawCreate(e) {
    var featureType = e.features[0].geometry.type;
    var featureId = e.features[0].id;
    if (featureType === selectedType) {
        if (!document.getElementById("".concat(currentLayerId, "-checkbox")).checked) {
            drawControls.delete(featureId);
            Swal.fire({
                title: "Current layer isn't visible",
                text: "Turn on current layer to add a new " + (featureType === "Point" ? "point" : (featureType === "Polygon" ? "polygon" : "line") + ".")
            });
        }
        else {
            layers.find(function (_a) {
                var id = _a.id;
                return id === currentLayerId;
            }).features.push(__assign(__assign({}, e.features[0]), { properties: __assign(__assign({}, e.features[0].properties), { createdAt: new Date().getTime() }) }));
        }
    }
    else if (selectedType === "unset") {
        if (!layers.some(function (layer) { return layer.type === featureType; })) {
            selectedType = featureType;
            currentLayerId = generateRandomString(10);
            var layerName = "Untitled ".concat(featureType === "Point"
                ? "points"
                : featureType === "LineString"
                    ? "lines"
                    : "polygons", " layer");
            layers.push({
                name: layerName,
                type: featureType,
                features: [__assign(__assign({}, e.features[0]), { properties: __assign(__assign({}, e.features[0].properties), { createdAt: new Date().getTime() }) })],
                id: currentLayerId,
            });
            console.log("createdAt field has been added ", layers);
            addLayer({
                type: selectedType,
                name: layerName,
                id: currentLayerId,
            });
            setCurrentLayer(currentLayerId, featureType);
        }
    }
    else {
        if (!layers.some(function (layer) { return layer.type === featureType; })) {
            selectedType = featureType;
            currentLayerId = generateRandomString(10);
            var layerName = "Untitled ".concat(featureType === "Point"
                ? "points"
                : featureType === "LineString"
                    ? "lines"
                    : "polygons", " layer");
            layers.push({
                name: layerName,
                type: featureType,
                features: [__assign(__assign({}, e.features[0]), { properties: __assign(__assign({}, e.features[0].properties), { createdAt: new Date().getTime() }) })],
                id: currentLayerId,
            });
            addLayer({
                type: selectedType,
                name: layerName,
                id: currentLayerId,
            });
            setCurrentLayer(currentLayerId, featureType);
        }
        else {
            drawControls.delete(featureId);
            var currentLayerName = layers.find(function (_a) {
                var id = _a.id;
                return id === currentLayerId;
            }).name;
            Swal.fire({
                title: "Wrong Layer!",
                text: "\"".concat(currentLayerName, "\" is the current selected layer, switch to a ").concat(featureType === "Point" ? "point's" : (featureType === "Polygon") ? "polygon's" : "line's", " layer to add a ").concat(featureType === "Point" ? "point" : (featureType === "Polygon") ? "polygon" : "line"),
                icon: "error"
            });
        }
    }
    saveProjectToFirebase();
}
function addLayer(_a) {
    var type = _a.type, name = _a.name, id = _a.id;
    var layersContainer = document.getElementById("layers-container");
    layerIds.push(id);
    // Create the new layer element
    var layerDiv = document.createElement("div");
    layerDiv.className = "flex mb-2 ".concat(id === currentLayerId ? "selected" : "");
    layerDiv.id = id;
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "".concat(id, "-checkbox");
    checkbox.checked = true;
    var innerDiv = document.createElement("div");
    innerDiv.className = "flex ml-2 border items-center rounded-lg";
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = name;
    nameInput.className = "pl-2 py-1 rounded-tl-lg rounded-bl-lg";
    nameInput.id = "".concat(id, "-name-input");
    var changeTypeBtn = document.createElement("div");
    changeTypeBtn.className = "flex rounded-tr-lg rounded-br-lg";
    changeTypeBtn.style.backgroundColor = "#12abac";
    var iconContainer = document.createElement("div");
    iconContainer.className = "type-btn grid items-center";
    var icon = document.createElement("i");
    icon.className = "fa-solid p-2 ".concat(type === "Polygon" ? "fa-vector-square" :
        type === "Point" ? "fa-location-pin" :
            "fa-bezier-curve");
    icon.id = "change-type-btn-".concat(id);
    var viewDataTableIconContainer = document.createElement("div");
    viewDataTableIconContainer.className = "viewDataTableIcon p-2";
    var viewDataTableIcon = document.createElement("i");
    viewDataTableIcon.className = "fa fa-table";
    viewDataTableIconContainer.appendChild(viewDataTableIcon);
    var featuresContainer = document.createElement("div");
    featuresContainer.className = "features-container";
    var features = document.createElement("table");
    features.id = id + "-features";
    features.className = "feature-tray w-full";
    featuresContainer.appendChild(features);
    iconContainer.appendChild(icon);
    changeTypeBtn.appendChild(iconContainer);
    changeTypeBtn.appendChild(viewDataTableIconContainer);
    // Append elements
    innerDiv.appendChild(nameInput);
    innerDiv.appendChild(changeTypeBtn);
    layerDiv.appendChild(checkbox);
    layerDiv.appendChild(innerDiv);
    layersContainer.appendChild(layerDiv);
    layersContainer.appendChild(featuresContainer);
    // Add event listeners
    setTimeout(function () {
        checkbox.addEventListener("change", function (e) {
            var isChecked = e.target.checked;
            if (!isChecked) {
                layers.forEach(function (layer) {
                    if (id === layer.id) {
                        layer.features.forEach(function (feature) {
                            drawControls.delete(feature.id);
                        });
                    }
                });
            }
            else {
                layers.forEach(function (layer) {
                    if (id === layer.id) {
                        layer.features.forEach(function (feature) {
                            drawControls.add(feature);
                        });
                    }
                });
            }
        });
        viewDataTableIconContainer.addEventListener("click", function () {
            var clickedLayer = layers.find(function (layer) { return layer.id === id; });
            if (selectedDataTableLayer === id) {
                populateDataTable(clickedLayer, false);
                selectedDataTableLayer = "";
            }
            else {
                selectedDataTableLayer = id;
                populateDataTable(clickedLayer, true);
            }
        });
        icon.addEventListener("click", function (e) {
            setCurrentLayer(id, type);
        });
        nameInput.addEventListener("change", function (e) {
            var newName = e.target.value;
            if (newName) {
                var layer = layers.find(function (layer) { return layer.id === id; });
                layer.name = e.target.value;
                saveProjectToFirebase();
            }
        });
    }, 1000);
}
function setCurrentLayer(value, type) {
    selectedType = type;
    currentLayerId = value;
    layers.forEach(function (_a) {
        var id = _a.id;
        if (id !== value) {
            document.getElementById(id).classList.remove("selected");
        }
        else {
            document.getElementById(id).classList.add("selected");
        }
    });
}
