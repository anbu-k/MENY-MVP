"use strict";
function generateMapHTML(map) {
    return "\n      <div class=\"layer-list-row\">\n        <input class=\"".concat(map.id, "\" type=\"radio\" name=\"ltoggle\" value=\"").concat(map.id, "\" />\n        <input class=\"").concat(map.id, "\" type=\"radio\" name=\"rtoggle\" value=\"").concat(map.id, "\" ").concat(map.checked ? 'checked="checked"' : "", "/>\n        &nbsp;\n        <label for=\"").concat(map.id, "\">").concat(map.name, "<div class=\"dummy-label-layer-space\"></div></label>\n        <div class=\"layer-buttons-block\">\n          <div class=\"layer-buttons-list\">\n            <i class=\"fa fa-crosshairs zoom-to-layer\" onclick=\"").concat(map.zoomFunction, "\" title=\"Zoom to Layer\"></i>\n            <i class=\"fa fa-info-circle layer-info trigger-popup\" id=\"").concat(map.infoId, "\" title=\"Layer Info\"></i>\n          </div>\n        </div>\n      </div>\n    ");
}
// Add the generated HTML to the #castello-maps-section
document.getElementById("castello-maps-section").innerHTML = castelloMaps
    .map(generateMapHTML)
    .join("");
