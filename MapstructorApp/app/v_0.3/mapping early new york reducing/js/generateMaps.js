/**
 * Generates HTML for a map layer item to be displayed in the UI
 * 
 * @param {object} map - The map object contaaining details for rendering
 * @returns {string} - A string of HTML representing the map layer item
 */
function generateMapHTML(map) {
  // The function returns a string of HTML to represent the map layer
  return `
      <div class="layer-list-row">
        <input class="${map.id}" type="radio" name="ltoggle" value="${
    map.id
  }" />
        <input class="${map.id}" type="radio" name="rtoggle" value="${
    map.id
  }" ${map.checked ? 'checked="checked"' : ""}/>
        &nbsp;
        <label for="${map.id}">${
    map.name
  }<div class="dummy-label-layer-space"></div></label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i class="fa fa-crosshairs zoom-to-layer" onclick="${
              map.zoomFunction
            }" title="Zoom to Layer"></i>
            <i class="fa fa-info-circle layer-info trigger-popup" id="${
              map.infoId
            }" title="Layer Info"></i>
          </div>
        </div>
      </div>
    `;
}

// Add the generated HTML to the #castello-maps-section
document.getElementById("castello-maps-section").innerHTML = castelloMaps
  .map(generateMapHTML) // Use generateMapHTML to create HTML for each map
  .join("");            // join the array of HTML strings into a single string
