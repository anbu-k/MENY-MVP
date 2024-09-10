/**
 * @param {{
 *  id: string;
 * name?: string;
 * caretId?: string;
 * label: string;
 * iconColor?: string;
 * itemSelector?: string;
 * zoomTo?: string;
 * infoId: string;
 * type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
 * iconType?: "square"
 * }[]} layers
 * @returns {string}
 */
function renderManhattanLayers(layers) {
  const lastBitOfManhattanSectionTemplate = `
<div class="layer-list-row">
  <input
    type="checkbox"
    id="current_buildings_items"
    name="current_buildings_items"
  />
  <label for="current_buildings_items">
    <i class="fas fa-caret-down"></i> Current Buildings
    <div class="dummy-label-layer-space"></div
  ></label>
</div>

<div class="layer-list-row">
  <input
    type="checkbox"
    class="current_buildings"
    id="current_buildings"
    name="current_buildings"
  />
  <label for="current_buildings">
    <i class="fa fa-square" style="color: #ff7f50"></i> Current
    Buildings</label
  >
</div>
`; 
  let r = "";
  layers.forEach((layer) => {
    if (layer.type === "group") {
      r += renderLayerRow(layer);
    } else if (layer.type === "lots-events") {
      r += renderCirclePointLayerRow(layer);
    } else if (layer.type === "grants-lots") {
      r += renderGrantLotsLayerRow(layer);
    } else if (layer.type === "castello-points") {
      r += renderCastelloPointsLayerRow(layer);
    } else if (layer.type === "current-buildings"){
      r += lastBitOfManhattanSectionTemplate;
      r += `<div class="layer-list-row">
      <input
        type="checkbox"
        class="current_buildings"
        id="current_buildings_lines"
        name="current_buildings_lines"
      />
      <label for="current_buildings_lines">
        <i class="far fa-square" style="color: #0000ff"></i> Current
        Buildings
        <div class="dummy-label-layer-space"></div
      ></label>
      <div class="layer-buttons-block">
        <div class="layer-buttons-list">
          <i
            class="fa fa-crosshairs zoom-to-layer"
            onclick="zoomtocenter('NA')"
            title="Zoom to Layer"
          ></i>
          <i
            class="fa fa-info-circle layer-info trigger-popup"
            id="current-buildings-lines-info-layer"
            title="Layer Info"
          ></i>
        </div>
      </div>
    </div>`
    } else {
      r += renderManahattaLayerItem(layer);
    }
  });
  return r;
}

/**
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings" | "custom_indian_paths";
* iconType?: "square"
* }[]} layers
* @returns {string}
*/
function renderLongIslandLayers(layers){
  let r = ''
  const customIndianTemplate = `<div class="layer-list-row">
  <input type="checkbox" id="indian_paths" name="indian_paths" />
  <label for="indian_paths">
    <i class="fas fa-slash slash-icon" style="color: #ff0000"></i>
    1600-64 | Paths
    <div class="dummy-label-layer-space"></div
  ></label>
  <div class="layer-buttons-block">
    <div class="layer-buttons-list">
      <i
        class="fa fa-crosshairs zoom-to-layer"
        onclick="zoomtobounds('Brooklyn')"
        title="Zoom to Layer"
      ></i>
      <i
        class="fa fa-info-circle layer-info trigger-popup"
        id="indian-paths-info-layer"
        title="Layer Info"
      ></i>
    </div>
  </div>
</div>`
  layers.forEach(layer => {
    if(layer.type === "group"){
      r += renderLayerRow(layer, true);
    } else if(layer.type === "custom_indian_paths"){
      r+= customIndianTemplate;
    } else {
      r+= renderManahattaLayerItem(layer)
    }
  })
  return r;
}


/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square";
* isSolid?: boolean;
* }} layerData 
 * @returns {string}
 */
function renderLayerRow(layerData, isMinus=false) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          class="manahatta_items"
          id="${layerData.id || "manahatta_items"}"
          name="${layerData.name || "manahatta_items"}"
        />
        <i
          class="fas fa-${isMinus? "minus" : "plus"}-square compress-expand-icon"
          id="${layerData.caretId || "manahatta-layer-caret"}"
          onclick="itemsCompressExpand('${layerData.itemSelector || ""}','#${
    layerData.caretId || ""
  }')"
        ></i>
        <label for="${layerData.id || "manahatta_items"}">
          ${layerData.label || ""}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="${(layerData.id === "current_lots_items" || layerData.id === "grants_layer_items")? "zoomtocenter('NA')" :(layerData.id === "farms_layer_items"? `zoomtocenter('${layerData.zoomTo}')`:`zoomtobounds('${layerData.zoomTo || ""}')`)}"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "manahatta-info"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;
  return html;
}
/**
 * 
 * @param {{
 *  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square";
* isSolid?: boolean;
* }} layerData 
 * @returns {string}
 */
function renderManahattaLayerItem(layerData) {
  const html = `
      <div class="layer-list-row ${layerData.topLayerClass}_item">
        &nbsp; &nbsp; &nbsp;
        <input
          type="checkbox"
          class="${layerData.className}"
          id="${layerData.id || "lenape_trails"}"
          name="${layerData.name || "lenape_trails"}"
        />
        <label for="${layerData.id || "lenape_trails"}">
          <i class="${layerData.isSolid? "fas" : "far"} fa-${layerData.iconType || "slash"} ${["square", "circle", "comment-dots"].includes(layerData.iconType)? "" : "slash-icon"}" style="color: ${
            layerData.iconColor || "#ff0000"
          }"></i>
          ${layerData.label || "Lenape Trails"}
        </label>
      </div>
    `;

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData
* 
* @param {{
*  id: string;
* name?: string;
* label: string;
* iconColor?: string;
* zoomTo?: string;
* infoId: string;
* }} fallbackData 
 * @returns {string}
 */
function renderGenericLayerRow(layerData, fallbackData) {
  const html = `
  <div class="layer-list-row">
    <input
      type="checkbox"
      id="${layerData.id || fallbackData.id}"
      name="${layerData.name || fallbackData.name}"
      ${layerData.checked ? 'checked="checked"' : ""}
    />

    <label for="${layerData.id || fallbackData.id}">
      <i class="fa fa-play-circle" style="color: ${
        layerData.iconColor || fallbackData.iconColor
      }"></i>${layerData.label || fallbackData.label}
      <div class="dummy-label-layer-space"></div>
    </label>
    <div class="layer-buttons-block">
      <div class="layer-buttons-list">
        <i
          class="fa fa-crosshairs zoom-to-layer"
          onclick="zoomtocenter('${layerData.zoomTo || "N/A"}')"
          title="Zoom to Layer"
        ></i>
        <i
          class="fa fa-info-circle layer-info trigger-popup"
          id="${layerData.infoId || fallbackData.infoId}"
          title="Layer Info"
        ></i>
      </div>
    </div>
  </div>
`;

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderCirclePointLayerRow(layerData) {
  const fallbackData = {
  id: "circle_point",
  name: "circle_point",
  label: "1643-75 | Lot Events",
  iconColor: "#097911",
  infoId: "demo-taxlot-info-layer",
  }

  const html = renderGenericLayerRow(layerData, fallbackData);

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderGrantLotsLayerRow(layerData) {
  const fallbackData = {
    id: "grant_lots",
    name: "grant_lots",
    label: "1643-67 | Demo Grant Divisions: C7",
    iconColor: "#008888",
    infoId: "demo-grant-info-layer",
  }

  const html = renderGenericLayerRow(layerData, fallbackData);

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderCastelloPointsLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          id="${layerData.id || "castello_points"}"
          name="${layerData.name || "castello_points"}"
        />
        <label for="${layerData.id || "castello_points"}">
          <i class="fa fa-circle" style="color: ${
            layerData.iconColor || "#ff0000"
          }"></i>${layerData.label || "1660 | Castello Taxlots"}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="zoomtocenter('${layerData.zoomTo || "NA"}')"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "castello-info-layer"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;

  return html;
}



try{
  $("#long-island-section-layers").html(renderLongIslandLayers(longIslandLayerSections))
  $("#manahatta-section-layers").html(
    renderManhattanLayers(manhattanLayerSections)
  );
  $("#info-section-layers").html(renderLongIslandLayers(informationOfInterest))
  console.log("generateLayer script ran successfully :)");
}catch(error){
  console.log(error)
}
