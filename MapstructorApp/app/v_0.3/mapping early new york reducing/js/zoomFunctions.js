/**
 *  zooms both the beforeMap and afterMap to a predefined area (Dutch grants)
 *  it maintains the current rotation/bearing of the maps
 */
function testZoom() {
  // gets the current bearing of the beforeMap
    var current_bearing = beforeMap.getBearing();

    // defines the bounding box coordinates for the Dutch grants
    var TestBounds = [
      -74.01507471506183, 40.70239266372983, -74.00734180289922,
      40.709035402164524,
    ]; 
    //dutch grants, zooms the beforeMap and afterMap to the specified bounds, preserviong the current bearing
    beforeMap.fitBounds(TestBounds, { bearing: current_bearing });
    afterMap.fitBounds(TestBounds, { bearing: current_bearing });
  }
  
  /**
   * zooms both beforeMap and afterMap to specific geographic bounds based on the given area name
   * 
   * @param {string} boundsName - the name of the geographic area
   */
  function zoomtobounds(boundsName) {
    switch (boundsName) {
      case "LongIsland":
        // adjust bounds based on window width for mobile and desktop views
        if (windoWidth <= 637) {
          beforeMap.fitBounds([
            [-74.0419692, 40.5419011],
            [-71.8562705, 41.161155],
          ], { bearing: 0 });
          afterMap.fitBounds([
            [-74.0419692, 40.5419011],
            [-71.8562705, 41.161155],
          ], { bearing: 0 });
        } else {
          beforeMap.fitBounds([
            [-74.0419692, 40.5419011],
            [-71.8562705, 41.161155],
          ], {
            bearing: 0,
            padding: { top: 5, bottom: 5, left: 350, right: 5 },
          });
          afterMap.fitBounds([
            [-74.0419692, 40.5419011],
            [-71.8562705, 41.161155],
          ], {
            bearing: 0,
            padding: { top: 5, bottom: 5, left: 350, right: 5 },
          });
        }
        break;
      case "Brooklyn":
        beforeMap.fitBounds([
          [-74.04189660705046, 40.56952999398417],
          [-73.8335592388046, 40.73912795313439],
        ], { bearing: 0 });
        afterMap.fitBounds([
          [-74.04189660705046, 40.56952999398417],
          [-73.8335592388046, 40.73912795313439],
        ], { bearing: 0 });
        break;
      case "Manhattan":
        beforeMap.fitBounds([
          [-74.04772962697074, 40.682916945445164],
          [-73.90665099539478, 40.879038046804695],
        ], { bearing: na_bearing });
        afterMap.fitBounds([
          [-74.04772962697074, 40.682916945445164],
          [-73.90665099539478, 40.879038046804695],
        ], { bearing: na_bearing });
        break;
      case "World":
        beforeMap.fitBounds([
          [-179, -59], // [west, south]
          [135, 77], // [east, north]
        ], { bearing: 0 });
        afterMap.fitBounds([
          [-179, -59], // [west, south]
          [135, 77], // [east, north]
        ], { bearing: 0 });
        break;
    }
  }
  /**
   * zooms the beforeMap and afterMap to a specific center point, based on the provided name
   * 
   * @param {string} centerName - the name of the center location
   */
  function zoomtocenter(centerName) {
    switch (centerName) {
      case "NA":
        // zooms to a predefined North American center
        beforeMap.easeTo({
          center: na_center,
          zoom: na_zoom,
          bearing: na_bearing,
          pitch: 0,
        });
        afterMap.easeTo({
          center: na_center,
          zoom: na_zoom,
          bearing: na_bearing,
          pitch: 0,
        });
        break;
      case "Long Island":
        beforeMap.easeTo({
          center: [-73.094, 41.1],
          zoom: 8,
          bearing: 0,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-73.094, 41.1],
          zoom: 8,
          bearing: 0,
          pitch: 0,
        });
        break;
      case "New England":
        beforeMap.easeTo({
          center: [-72.898, 42.015],
          zoom: 7,
          bearing: 0,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-72.898, 42.015],
          zoom: 7,
          bearing: 0,
          pitch: 0,
        });
        break;
    }
  }
  
  
   /**
    * toggles the visibility of zoom labels on both the beforeMap and afterMap
    * 
    * @param {*} sel_opt - option to either show or hide zoom labels
    */
  function zoomLabels(sel_opt) {
    // if show is selected, display all zoom labels
    if (sel_opt == "show") {
      labelData.forEach(({title}) => {
        const id = `label-${title.toLowerCase().split(" ").join('-')}`
        afterMap.setLayoutProperty(id, "visibility", "visible")
        beforeMap.setLayoutProperty(id, "visibility", "visible")
      })
      // updates the UI buttons to reflect the current state
      document.getElementById("show-zoom-label").style.display = "inline-block";
      document.getElementById("hide-zoom-label").style.display = "none";
    } else {
      // if hide is selected, hide all zoom labels
      labelData.forEach(({title}) => {
        const id = `label-${title.toLowerCase().split(" ").join('-')}`
        afterMap.setLayoutProperty(id, "visibility", "none")
        beforeMap.setLayoutProperty(id, "visibility", "none")
      })
      // updates the UI buttons to reflect the current state
      document.getElementById("hide-zoom-label").style.display = "inline-block";
      document.getElementById("show-zoom-label").style.display = "none";
    }
  }
  