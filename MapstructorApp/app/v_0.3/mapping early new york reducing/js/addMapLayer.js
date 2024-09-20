/**
 * This function is used to add a layer to a map. It conditonally applies
 * a filter based on a given date. The filter makes sure that only data that
 * matches the specified date range (DayStart and DayEnd) is displayed.
 */
function addMapLayer(map, layerConfig, date) {
  if (date) {
    map.addLayer({
      ...layerConfig,
      filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
    });
  } else {
    map.addLayer({
      ...layerConfig,
    });
  }
}
