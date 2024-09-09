/**
 * Removes specified sources and layers from the map
 * 
 * @param {object} map - The map instance
 * @param {Array} points - an array of objects where each object specified a source or layer to be removed
 * Each object should have:
 *  - 'type': can be either source or layer, indicating what should be removed
 *  - 'id': the unique identifier for the source or layer to be removed
 */
function removeMapSourceLayer(map, points) {
  // iterates through each point (either a source or layer) provided in the points array
  points.forEach((point) => {
    switch (point.type) {
      // if the type is source, removes the corresponding map source
      case "source":
        if (map.getSource(point.id)) {
          map.removeSource(point.id);
        }
        return;
      // if the type is layer, removes the corresponding map layer
      case "layer":
        if (map.getLayer(points.id)) {
          map.removeLayer(points.id);
        }
    }
  });
}

