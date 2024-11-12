import { MutableRefObject } from "react";
import { ZoomLabel } from "../models/zoom-layer.model";
import { LayerSpecification, Map } from "mapbox-gl";
import { AnyLayer } from "mapbox-gl";


export function createLabel(props: ZoomLabel) {
    return {
        // Ggnerates a unique ID for the label by transforming the title to lowercase and replacing spaces with hyphens
        id: `label-${props.title.toLowerCase().replace(/\s+/g, '-')}`,
        type: "symbol",
          // defines the data source as GeoJSON, specifying the label's coordinates and properties
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              properties: { title: props.title, icon: "circle" },
              geometry: { type: "Point", coordinates: props.center }
            }],
          },
        },
        // conditionally includes the minzoom property if a minZoom value is provided.
        ...(props.minZoom && { minzoom: props.minZoom }),
    
        // defines the layout properties for the label, including text font, size, and visibility.
        layout: {
          visibility: "visible",
          "text-font": ["Asap Medium"],
          "text-field": "{title}",
          "text-size": 18,
        },
        paint: {
          "text-color": "#000000",
          "text-halo-width": 3,
          "text-halo-blur": 2,
          "text-halo-color": "#ffffff",
          "text-opacity": {
            default: 1,
            stops: [[6, 0], [6.5, 1]],
          },
        },
    };
}

export function addInteractivityToLabel(mapRef: MutableRefObject<Map | null>, layer: ZoomLabel) {
    let currMap: Map | null = mapRef.current;

    if(currMap == null) return;

    const labelObject = createLabel(layer);
    let labelId = labelObject.id;

    currMap?.addLayer(labelObject as any);

    currMap?.on("click", labelId, function () {
        if(layer.bounds) {
            currMap?.fitBounds(layer.bounds, { bearing: layer.bearing })
        } else if(layer.center) {
            currMap?.easeTo({
                center: layer.center,
                zoom: layer.zoom,
                speed: 0.2,
                curve: 1,
                duration: 1000,
                easing(t) {
                  return t;
                }
              })
        }
    });
}