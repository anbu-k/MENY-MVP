"use strict";
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
    var lastBitOfManhattanSectionTemplate = "\n<div class=\"layer-list-row\">\n <input\n   type=\"checkbox\"\n   id=\"current_buildings_items\"\n   name=\"current_buildings_items\"\n />\n <label for=\"current_buildings_items\">\n   <i class=\"fas fa-caret-down\"></i> Current Buildings\n   <div class=\"dummy-label-layer-space\"></div\n ></label>\n</div>\n\n<div class=\"layer-list-row\">\n <input\n   type=\"checkbox\"\n   class=\"current_buildings\"\n   id=\"current_buildings\"\n   name=\"current_buildings\"\n />\n <label for=\"current_buildings\">\n   <i class=\"fa fa-square\" style=\"color: #ff7f50\"></i> Current\n   Buildings</label\n >\n</div>\n";
    var r = "";
    layers.forEach(function (layer) {
        if (layer.type === "group") {
            r += renderLayerRow(layer);
        }
        else if (layer.type === "lots-events") {
            r += renderCirclePointLayerRow(layer);
        }
        else if (layer.type === "grants-lots") {
            r += renderGrantLotsLayerRow(layer);
        }
        else if (layer.type === "castello-points") {
            r += renderCastelloPointsLayerRow(layer);
        }
        else if (layer.type === "current-buildings") {
            r += lastBitOfManhattanSectionTemplate;
            r += "<div class=\"layer-list-row\">\n     <input\n       type=\"checkbox\"\n       class=\"current_buildings\"\n       id=\"current_buildings_lines\"\n       name=\"current_buildings_lines\"\n     />\n     <label for=\"current_buildings_lines\">\n       <i class=\"far fa-square\" style=\"color: #0000ff\"></i> Current\n       Buildings\n       <div class=\"dummy-label-layer-space\"></div\n     ></label>\n     <div class=\"layer-buttons-block\">\n       <div class=\"layer-buttons-list\">\n         <i\n           class=\"fa fa-crosshairs zoom-to-layer\"\n           onclick=\"zoomtocenter('NA')\"\n           title=\"Zoom to Layer\"\n         ></i>\n         <i\n           class=\"fa fa-info-circle layer-info trigger-popup\"\n           id=\"current-buildings-lines-info-layer\"\n           title=\"Layer Info\"\n         ></i>\n       </div>\n     </div>\n   </div>";
        }
        else {
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
function renderLongIslandLayers(layers) {
    var r = '';
    var customIndianTemplate = "<div class=\"layer-list-row\">\n <input type=\"checkbox\" id=\"indian_paths\" name=\"indian_paths\" />\n <label for=\"indian_paths\">\n   <i class=\"fas fa-slash slash-icon\" style=\"color: #ff0000\"></i>\n   1600-64 | Paths\n   <div class=\"dummy-label-layer-space\"></div\n ></label>\n <div class=\"layer-buttons-block\">\n   <div class=\"layer-buttons-list\">\n     <i\n       class=\"fa fa-crosshairs zoom-to-layer\"\n       onclick=\"zoomtobounds('Brooklyn')\"\n       title=\"Zoom to Layer\"\n     ></i>\n     <i\n       class=\"fa fa-info-circle layer-info trigger-popup\"\n       id=\"indian-paths-info-layer\"\n       title=\"Layer Info\"\n     ></i>\n   </div>\n </div>\n</div>";
    layers.forEach(function (layer) {
        if (layer.type === "group") {
            r += renderLayerRow(layer, true);
        }
        else if (layer.type === "custom_indian_paths") {
            r += customIndianTemplate;
        }
        else {
            r += renderManahattaLayerItem(layer);
        }
    });
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
function renderLayerRow(layerData, isMinus) {
    if (isMinus === void 0) { isMinus = false; }
    var html = "\n     <div class=\"layer-list-row\">\n       <input\n         type=\"checkbox\"\n         class=\"manahatta_items\"\n         id=\"".concat(layerData.id || "manahatta_items", "\"\n         name=\"").concat(layerData.name || "manahatta_items", "\"\n       />\n       <i\n         class=\"fas fa-").concat(isMinus ? "minus" : "plus", "-square compress-expand-icon\"\n         id=\"").concat(layerData.caretId || "manahatta-layer-caret", "\"\n         onclick=\"itemsCompressExpand('").concat(layerData.itemSelector || "", "','#").concat(layerData.caretId || "", "')\"\n       ></i>\n       <label for=\"").concat(layerData.id || "manahatta_items", "\">\n         ").concat(layerData.label || "", "\n         <div class=\"dummy-label-layer-space\"></div>\n       </label>\n       <div class=\"layer-buttons-block\">\n         <div class=\"layer-buttons-list\">\n           <i\n             class=\"fa fa-crosshairs zoom-to-layer\"\n             onclick=\"").concat((layerData.id === "current_lots_items" || layerData.id === "grants_layer_items") ? "zoomtocenter('NA')" : (layerData.id === "farms_layer_items" ? "zoomtocenter('".concat(layerData.zoomTo, "')") : "zoomtobounds('".concat(layerData.zoomTo || "", "')")), "\"\n             title=\"Zoom to Layer\"\n           ></i>\n           <i\n             class=\"fa fa-info-circle layer-info trigger-popup\"\n             id=\"").concat(layerData.infoId || "manahatta-info", "\"\n             title=\"Layer Info\"\n           ></i>\n         </div>\n       </div>\n     </div>\n   ");
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
    var html = "\n     <div class=\"layer-list-row ".concat(layerData.topLayerClass, "_item\">\n       &nbsp; &nbsp; &nbsp;\n       <input\n         type=\"checkbox\"\n         class=\"").concat(layerData.className, "\"\n         id=\"").concat(layerData.id || "lenape_trails", "\"\n         name=\"").concat(layerData.name || "lenape_trails", "\"\n       />\n       <label for=\"").concat(layerData.id || "lenape_trails", "\">\n         <i class=\"").concat(layerData.isSolid ? "fas" : "far", " fa-").concat(layerData.iconType || "slash", " ").concat(["square", "circle", "comment-dots"].includes(layerData.iconType) ? "" : "slash-icon", "\" style=\"color: ").concat(layerData.iconColor || "#ff0000", "\"></i>\n         ").concat(layerData.label || "Lenape Trails", "\n       </label>\n     </div>\n   ");
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
* infoId: string;
* }} fallbackData
* @returns {string}
*/
function renderGenericLayerRow(layerData, fallbackData) {
    var html = "\n <div class=\"layer-list-row\">\n   <input\n     type=\"checkbox\"\n     id=\"".concat(layerData.id || fallbackData.id, "\"\n     name=\"").concat(layerData.name || fallbackData.name, "\"\n     ").concat(layerData.checked ? 'checked="checked"' : "", "\n   />\n\n   <label for=\"").concat(layerData.id || fallbackData.id, "\">\n     <i class=\"fa fa-play-circle\" style=\"color: ").concat(layerData.iconColor || fallbackData.iconColor, "\"></i>").concat(layerData.label || fallbackData.label, "\n     <div class=\"dummy-label-layer-space\"></div>\n   </label>\n   <div class=\"layer-buttons-block\">\n     <div class=\"layer-buttons-list\">\n       <i\n         class=\"fa fa-crosshairs zoom-to-layer\"\n         onclick=\"zoomtocenter('").concat(layerData.zoomTo || "N/A", "')\"\n         title=\"Zoom to Layer\"\n       ></i>\n       <i\n         class=\"fa fa-info-circle layer-info trigger-popup\"\n         id=\"").concat(layerData.infoId || fallbackData.infoId, "\"\n         title=\"Layer Info\"\n       ></i>\n     </div>\n   </div>\n </div>\n");
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
    var fallbackData = {
        id: "circle_point",
        name: "circle_point",
        label: "1643-75 | Lot Events",
        iconColor: "#097911",
        infoId: "demo-taxlot-info-layer",
    };
    var html = renderGenericLayerRow(layerData, fallbackData);
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
    var fallbackData = {
        id: "grant_lots",
        name: "grant_lots",
        label: "1643-67 | Demo Grant Divisions: C7",
        iconColor: "#008888",
        infoId: "demo-grant-info-layer",
    };
    var html = renderGenericLayerRow(layerData, fallbackData);
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
    var fallbackData = {
        id: "castello_points",
        name: "castello_points",
        label: "1660 | Castello Taxlots",
        iconColor: "#ff0000",
        infoId: "castello-info-layer",
    };
    var html = renderGenericLayerRow(layerData, fallbackData);
    return html;
}
try {
    $("#long-island-section-layers").html(renderLongIslandLayers(longIslandLayerSections));
    $("#manahatta-section-layers").html(renderManhattanLayers(manhattanLayerSections));
    $("#info-section-layers").html(renderLongIslandLayers(informationOfInterest));
    console.log("generateLayer script ran successfully :)");
}
catch (error) {
    console.log(error);
}
