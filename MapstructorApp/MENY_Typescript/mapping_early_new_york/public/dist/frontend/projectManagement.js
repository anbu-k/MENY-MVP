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
var projectId = localStorage.getItem("PROJECT_ID");
var features = [];
/**
 * @type {{
 *   id: string,
 *   name: string,
 *   type: string,
 *   features: any[]
 * }[]}
 */
var layers = [];
var currentLayerId = "";
var selectedType = "unset";
var layerIds = [];
if (projectId) {
    getProjectById(projectId);
}
function saveProjectToFirebase() {
    var data = drawControls.getAll();
    data.features = layers.reduce(function (prev, curr) {
        return prev.concat(curr.features);
    }, []);
    var projectPatch = {
        features: JSON.stringify(data.features),
        layers: layers.map(function (layer) {
            return __assign(__assign({}, layer), { features: JSON.stringify(layer.features) });
        }),
    };
    window.updateDoc(doc(window.db, "projects", projectId), projectPatch);
}
function getProjectById(id) {
    window.getDoc(doc(window.db, "projects", id)).then(function (snapshot) {
        var data = snapshot.data();
        title.value = data.name;
        console.log(JSON.parse(data.features));
        features = JSON.parse(data.features);
        var projectLayers = data.layers;
        if (projectLayers.length) {
            currentLayerId = projectLayers[projectLayers.length - 1].id;
            selectedType = projectLayers[projectLayers.length - 1].type;
            projectLayers.forEach(function (layer) {
                addLayer(layer);
                layers.push(__assign(__assign({}, layer), { features: JSON.parse(layer.features) }));
                // populateDataTable()
            });
            drawControls.set({ features: features, type: "FeatureCollection" });
            features.forEach(createOrUpdateLabel);
            populateIdsTrayUnderLayers();
        }
    });
}
