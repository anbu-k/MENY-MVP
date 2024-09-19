/**
 * generates HTML for displaying a map item with interactive elements (radio buttons, zoom, info buttons)
 * 
 * @param {object} map - the map object containing properties such as:
 * - id : the unique identifier for the map
 * - name: the name of the map to be displayed as a label
 * - zoomFunction: the function to zoom to this map when the crosshairs icon is clicked
 * - infoId: the unique ID for the info button related to this map
 * - checked: boolean indicating if this map should be pre-selected/checked
 * @returns {string} - returns the HTML string for the map item, formatted for insertion into the page
 */
function generateMapHTML(map) {
    return `
      <div class="layer-list-row">
        <input class="${map.id}" type="radio" name="ltoggle" value="${map.id}" />
        <input class="${map.id}" type="radio" name="rtoggle" value="${map.id}" ${map.checked ? 'checked="checked"' : ''}/>
        &nbsp;
        <label for="${map.id}">${map.name}<div class="dummy-label-layer-space"></div></label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i class="fa fa-crosshairs zoom-to-layer" onclick="${map.zoomFunction}" title="Zoom to Layer"></i>
            <i class="fa fa-info-circle layer-info trigger-popup" id="${map.infoId}" title="Layer Info"></i>
          </div>
        </div>
      </div>
    `;
  }
  

const mapsHTML = castelloMaps.map(generateMapHTML).join('');

// Add the generated HTML to the #new-england-maps-section
document.getElementById('new-england-maps-section').innerHTML = newEnglandMapsData.map(generateMapHTML).join('');

// Add the generated HTML to the #manahatta-maps-section
document.getElementById('manahatta-maps-section').innerHTML  = manahattaMapsData.map(generateMapHTML).join('');
document.getElementById('long-island-maps-section').innerHTML = longIslandMapsData.map(generateMapHTML).join('');

// Add the generated HTML to the #castello-maps-section
document.getElementById('castello-maps-section').innerHTML = castelloMaps.map(generateMapHTML).join('');

document.getElementById('new-netherland-maps-section').innerHTML = newNetherlandMapsData.map(generateMapHTML).join('');