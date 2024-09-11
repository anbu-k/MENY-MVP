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
function addMapLayer(map, layerConfig, date) {
    if (date) {
        map.addLayer(__assign(__assign({}, layerConfig), { filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]] }));
    }
    else {
        map.addLayer(__assign({}, layerConfig));
    }
}
