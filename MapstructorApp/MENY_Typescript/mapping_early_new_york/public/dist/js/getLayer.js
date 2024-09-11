"use strict";
function getLayer(layerId) {
    return layers.find(function (_a) {
        var id = _a.id;
        return id === layerId;
    });
}
