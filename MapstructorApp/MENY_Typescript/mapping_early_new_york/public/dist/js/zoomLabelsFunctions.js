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
function createLabel(title, coordinates, minZoom) {
    if (minZoom === void 0) { minZoom = null; }
    return __assign(__assign({ id: "label-".concat(title.toLowerCase().replace(/\s+/g, '-')), type: "symbol", source: {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [{
                        type: "Feature",
                        properties: { title: title, icon: "circle" },
                        geometry: { type: "Point", coordinates: coordinates }
                    }],
            },
        } }, (minZoom && { minzoom: minZoom })), { layout: {
            visibility: "visible",
            "text-font": ["Asap Medium"],
            "text-field": "{title}",
            "text-size": 18,
        }, paint: {
            "text-color": "#000000",
            "text-halo-width": 3,
            "text-halo-blur": 2,
            "text-halo-color": "#ffffff",
            "text-opacity": {
                default: 1,
                stops: [[6, 0], [6.5, 1]],
            },
        } });
}
/*
Function to Add Interactivity to Labels:
Create a function to add event listeners for interactivity (mouseenter, mouseleave, click):
*/
function addInteractivityToLabel(map, labelObject, boundsName) {
    var labelId = labelObject.id;
    map.on("mouseenter", labelId, function () {
        map.setPaintProperty(labelId, "text-color", "#ff0000");
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", labelId, function () {
        map.setPaintProperty(labelId, "text-color", "#482525");
        map.getCanvas().style.cursor = "";
    });
    map.on("click", labelId, function () {
        zoom_labels_click_ev = true;
        zoomtobounds(boundsName);
    });
}
