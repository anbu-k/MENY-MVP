"use strict";
function removeMapSourceLayer(map, points) {
    points.forEach(function (point) {
        switch (point.type) {
            case "source":
                if (map.getSource(point.id)) {
                    map.removeSource(point.id);
                }
                return;
            case "layer":
                if (map.getLayer(points.id)) {
                    map.removeLayer(points.id);
                }
        }
    });
}
