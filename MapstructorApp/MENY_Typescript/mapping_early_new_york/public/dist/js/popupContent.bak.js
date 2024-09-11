"use strict";
var popupConfigurations = {
    'dutch_grants-5ehfqe': {
        template: "<div class='infoLayerDutchGrantsPopUp'><b>Name:</b> {name}<br><b>Dutch Grant Lot:</b> {Lot}</div>"
    },
    'lot_events-bf43eb': {
        template: "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/{TAXLOT}' target='_blank'>{TAXLOT}</a></h2></b></div>"
    },
    'places': {
        template: "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b> <br/> {LOT2}</div>"
    },
    'native-groups-area': {
        template: "<div class='infoLayerCastelloPopUp'><b>Name:</b> {name}</div>"
    }
};
var layerConfigurations = {
    'DutchGrants': {
        elementId: '#infoLayerDutchGrants',
        viewFlag: 'dutchGrantsLayerViewFlag',
        viewId: 'dutchGrantsLayerViewId',
        closeInfoFunction: 'closeDutchGrantsInfo',
        clickHandler: 'dutchGrantsClickHandle',
        template: "<div class='infoLayerDutchGrantsPopUp'><b>Name:</b> {name}<br><b>Dutch Grant Lot:</b> {Lot}</div>"
    },
    // Define other layers similarly
};
function handleClick(event, layerKey) {
    var config = layerConfigurations[layerKey];
    var properties = event.features[0].properties;
    var htmlContent = buildPopUpInfo(properties, config.template);
    if (window[config.viewId] === event.features[0].id) {
        if (window[config.viewFlag]) {
            toggleLayerPanel(false);
            window[config.closeInfoFunction]();
        }
        else {
            $(config.elementId).html(htmlContent).slideDown();
            updateLayerViewFlag(true, layerKey, event.features[0].id);
        }
    }
    else {
        $(config.elementId).html(htmlContent).slideDown();
        toggleLayerPanel(true);
        updateLayerViewFlag(false, layerKey, window[config.viewId]);
        updateLayerViewFlag(true, layerKey, event.features[0].id);
    }
    window[config.viewId] = event.features[0].id;
}
function toggleLayerPanel(show) {
    if ($("#view-hide-layer-panel").length > 0 && !layer_view_flag === show) {
        $("#rightInfoBar").css("display", show ? "block" : "none");
        setTimeout(function () { $("#rightInfoBar").slideUp(); }, 500);
    }
}
function updateLayerViewFlag(viewFlag, layerKey, featureId) {
    var sourceKey = layerKey.toLowerCase().replace(' ', '_') + '-highlighted';
    var sourceConfig = { source: sourceKey, sourceLayer: sourceKey, id: featureId };
    afterMap.setFeatureState(sourceConfig, { hover: viewFlag });
    beforeMap.setFeatureState(sourceConfig, { hover: viewFlag });
}
//#region Main Popup Content Generation
// This function dynamically generates popup content based on the given ID and features from the map.
// It identifies the map layer and selects the appropriate content generation function for the popup.
function generatePopupContent(id, features) {
    var config = popupConfigurations[id];
    if (!config)
        return null; // Return null if no configuration exists
    var content = config.template;
    var properties = features[0].properties;
    // Replace placeholders in the template with actual property values
    for (var key in properties) {
        content = content.replace(new RegExp("{".concat(key, "}"), 'g'), properties[key] || 'Not available');
    }
    return content;
}
//#endregion
//#region Utility Function
// Retrieves a globally defined function by its name, allowing for dynamic function execution.
// Useful for invoking specific popup content functions based on string identifiers.
function getPopupByName(name) {
    return popupsObject[name];
}
//#endregion
// #region Popups Initialization
// Initialize popups for displaying information on the maps. These popups are configured to not close on click, indicating they may be used for persistent display of information.
// Function to create a mapboxgl.Popup with common options
function createPopup(offset) {
    if (offset === void 0) { offset = 0; }
    return new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: offset,
    });
}
// Initialize popups for displaying information on the maps
var popupConfig = [
    { name: "MapPopUp", count: undefined },
    { name: "MapPlacesPopUp", count: undefined },
    { name: "HighCastelloPopUp", count: undefined },
    { name: "HighGrantLotsPopUp", count: 5 },
    { name: "MapGrantLotPopUp", count: 5 },
    { name: "HighMapGrantLotPopUp", count: 5 },
    { name: "MapDutchGrantPopUp", count: 5 },
    { name: "MapNativeGroupsPopUp", count: 5 },
    { name: "HighMapNativeGroupsPopUp", count: 5 },
];
var createPopups = function () {
    var popupsObj = {};
    popupConfig.forEach(function (config) {
        popupsObj["after".concat(config.name)] = createPopup(config.count);
        popupsObj["before".concat(config.name)] = createPopup(config.count);
    });
    return popupsObj;
};
var popupsObject = createPopups();
// #endregion
// #region Hovered and Clicked State Management
// Variables to manage the state of hovered and clicked map features. These are used to track which features are currently under interaction, allowing for dynamic updates to the UI or map based on user actions.
var clickedStateId = null;
var demo_layer_feature_props = null, demo_layer_features = null, demo_layer_taxlot = "";
// #endregion
// #region Event Handling and Popups
// Functions to handle click events on map features and display popups with detailed information.
[beforeMap, afterMap].forEach(function (map, id) {
    if (id === 0) {
        init_zoom = map.getZoom();
        init_bearing = map.getBearing();
        init_center = map.getCenter();
    }
    map.on("load", function (e) {
        map
            .on("click", "lot_events-bf43eb", function (e) {
            console.log(e.features[0].properties);
            DemoClickHandle(e);
        })
            .on("click", "places", function (e) {
            console.log(e.features[0].properties);
            CastelloClickHandle(e);
        })
            .on("click", "dutch_grants-5ehfqe", function (e) {
            console.log(e.features[0].properties);
            DutchGrantsClickHandle(e);
        })
            .on("click", "native-groups-area", function (e) {
            console.log(e.features[0].properties);
            NativeGroupsClickHandle(e);
        })
            .on("click", function () {
            DefaultHandle();
        });
    });
    map.on("error", console.log);
});
// #endregion
//#region Utility Handlers
function DefaultHandle() {
    if (!demo_taxlot_click_ev &&
        !castello_click_ev &&
        !grant_lots_click_ev &&
        !dutch_grant_click_ev &&
        !farms_click_ev &&
        !curr_layer_click_ev &&
        !settlements_click_ev &&
        !info_click_ev &&
        !gravesend_click_ev &&
        !native_groups_click_ev &&
        !karl_click_ev &&
        !zoom_labels_click_ev) {
        if (windoWidth > 637)
            if ($("#view-hide-layer-panel").length > 0)
                $("#view-hide-layer-panel").trigger("click");
    }
    demo_taxlot_click_ev = false;
    castello_click_ev = false;
    grant_lots_click_ev = false;
    dutch_grant_click_ev = false;
    native_groups_click_ev = false;
    zoom_labels_click_ev = false;
}
//#endregion
//#region Close Info and ClickHandle Functions
function closeCastelloInfo() {
    $("#infoLayerCastello").slideUp();
    castello_layer_view_flag = false;
    ["after", "before"].forEach(function (position) {
        if (popupsObject["".concat(position, "HighCastelloPopUp")].isOpen())
            popupsObject["".concat(position, "HighCastelloPopUp")].remove();
    });
}
function CastelloClickHandle(event) {
    if (castello_layer_view_flag && clickedStateId == event.features[0].id) {
        if ($("#view-hide-layer-panel").length > 0)
            if (!layer_view_flag) {
                $("#rightInfoBar").css("display", "block");
                setTimeout(function () {
                    $("#rightInfoBar").slideUp();
                }, 500);
            }
        closeCastelloInfo();
    }
    else {
        clickedStateId = event.features[0].id;
        var coordinates = [];
        coordinates = event.features[0].geometry.coordinates.slice();
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        // console.log("setting html for popup")
        ["before", "after"].forEach(function (position) {
            popupsObject["".concat(position, "HighCastelloPopUp")]
                .setLngLat(coordinates)
                .setHTML(buildPopUpInfo(event.features[0].properties, undefined, "popup"));
            if (!popupsObject["".concat(position, "HighCastelloPopUp")].isOpen())
                popupsObject["".concat(position, "HighCastelloPopUp")].addTo(position === "before" ? beforeMap : afterMap);
        });
        if ($(".infoLayerElem").first().attr("id") != "infoLayerCastello")
            $("#infoLayerCastello").insertBefore($(".infoLayerElem").first());
        $("#infoLayerCastello")
            .html(buildPopUpInfo(event.features[0].properties, undefined, "info-panel"))
            .slideDown();
        if (!layer_view_flag)
            if ($("#view-hide-layer-panel").length > 0)
                $("#view-hide-layer-panel").trigger("click");
        //}
        castello_layer_view_flag = true;
    }
    castello_click_ev = true;
}
function closeDemoInfo() {
    $("#demoLayerInfo").slideUp();
    demo_layer_view_flag = false;
    if (afterHighDemoPopUp.isOpen())
        afterHighDemoPopUp.remove();
    if (beforeHighDemoPopUp.isOpen())
        beforeHighDemoPopUp.remove();
}
function DemoClickHandle(event) {
    if (demo_layer_view_flag) {
        if ($("#view-hide-layer-panel").length > 0)
            if (!layer_view_flag) {
                $("#rightInfoBar").css("display", "block");
                setTimeout(function () {
                    $("#rightInfoBar").slideUp();
                }, 500);
            }
        closeDemoInfo();
    }
    else {
        demo_layer_taxlot = event.features[0].properties.TAXLOT;
        demoFilterRangeCalc();
        buildPopUpInfo(event.features[0].properties, "#demoLayerInfo");
        if ($(".infoLayerElem").first().attr("id") != "demoLayerInfo")
            $("#demoLayerInfo").insertBefore($(".infoLayerElem").first());
        $("#demoLayerInfo").slideDown();
        if (!layer_view_flag)
            if ($("#view-hide-layer-panel").length > 0)
                $("#view-hide-layer-panel").trigger("click");
        demo_layer_view_flag = true;
        var coordinates = [];
        coordinates = event.features[0].geometry.coordinates.slice();
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        beforeHighDemoPopUp
            .setLngLat(coordinates)
            .setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
            demo_layer_taxlot +
            "' target='_blank'>" +
            demo_layer_taxlot +
            "</a></h2></b></div>");
        if (!beforeHighDemoPopUp.isOpen())
            beforeHighDemoPopUp.addTo(beforeMap);
        afterHighDemoPopUp
            .setLngLat(coordinates)
            .setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
            demo_layer_taxlot +
            "' target='_blank'>" +
            demo_layer_taxlot +
            "</a></h2></b></div>");
        if (!afterHighDemoPopUp.isOpen())
            afterHighDemoPopUp.addTo(afterMap);
    }
    demo_taxlot_click_ev = true;
}
function closeDutchGrantsInfo() {
    $("#infoLayerDutchGrants").slideUp();
    dgrants_layer_view_flag = false;
    afterMap.setFeatureState({
        source: "dutch_grants-5ehfqe-highlighted",
        sourceLayer: "dutch_grants-5ehfqe",
        id: dgrants_layer_view_id,
    }, { hover: false });
    beforeMap.setFeatureState({
        source: "dutch_grants-5ehfqe-highlighted",
        sourceLayer: "dutch_grants-5ehfqe",
        id: dgrants_layer_view_id,
    }, { hover: false });
    ["before", "after"].forEach(function (position) {
        if (popupsObject["".concat(position, "HighMapGrantLotPopUp")].isOpen())
            popupsObject["".concat(position, "HighMapGrantLotPopUp")].remove();
    });
}
function DutchGrantsClickHandle(event) {
    var highPopUpHTML = "";
    if (typeof dutch_grant_lots_info[event.features[0].properties.Lot] ==
        "undefined") {
        highPopUpHTML =
            "<div class='infoLayerDutchGrantsPopUp'>" +
                event.features[0].properties.name +
                "<br>";
    }
    else {
        highPopUpHTML =
            "<div class='infoLayerDutchGrantsPopUp'>" +
                (dutch_grant_lots_info[event.features[0].properties.Lot].name_txt.length >
                    0
                    ? dutch_grant_lots_info[event.features[0].properties.Lot].name_txt
                    : event.features[0].properties.name) +
                "<br>";
    }
    highPopUpHTML +=
        "<b>Dutch Grant Lot: </b>" + event.features[0].properties.Lot + "</div>";
    if (dgrants_layer_view_id == event.features[0].id) {
        if (dgrants_layer_view_flag) {
            if ($("#view-hide-layer-panel").length > 0)
                if (!layer_view_flag) {
                    $("#rightInfoBar").css("display", "block");
                    setTimeout(function () {
                        $("#rightInfoBar").slideUp();
                    }, 500);
                }
            closeDutchGrantsInfo();
        }
        else {
            buildPopUpInfo(event.features[0].properties, "#infoLayerDutchGrants");
            if ($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
                $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
            $("#infoLayerDutchGrants").slideDown();
            if ($("#view-hide-layer-panel").length > 0)
                if (!layer_view_flag)
                    $("#view-hide-layer-panel").trigger("click");
            dgrants_layer_view_flag = true;
            afterMap.setFeatureState({
                source: "dutch_grants-5ehfqe-highlighted",
                sourceLayer: "dutch_grants-5ehfqe",
                id: dgrants_layer_view_id,
            }, { hover: true });
            beforeMap.setFeatureState({
                source: "dutch_grants-5ehfqe-highlighted",
                sourceLayer: "dutch_grants-5ehfqe",
                id: dgrants_layer_view_id,
            }, { hover: true });
            ["after", "before"].forEach(function (position) {
                var map = position === "after" ? afterMap : beforeMap;
                popupsObject["".concat(position, "HighMapGrantLotPopUp")]
                    .setLngLat(event.lngLat)
                    .setHTML(highPopUpHTML);
                if (!popupsObject["".concat(position, "HighMapGrantLotPopUp")].isOpen())
                    popupsObject["".concat(position, "HighMapGrantLotPopUp")].addTo(map);
            });
        }
    }
    else {
        buildPopUpInfo(event.features[0].properties, "#infoLayerDutchGrants");
        if ($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
            $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
        $("#infoLayerDutchGrants").slideDown();
        if ($("#view-hide-layer-panel").length > 0)
            if (!layer_view_flag)
                $("#view-hide-layer-panel").trigger("click");
        dgrants_layer_view_flag = true;
        //*A#
        afterMap.setFeatureState({
            source: "dutch_grants-5ehfqe-highlighted",
            sourceLayer: "dutch_grants-5ehfqe",
            id: dgrants_layer_view_id,
        }, { hover: false });
        afterMap.setFeatureState({
            source: "dutch_grants-5ehfqe-highlighted",
            sourceLayer: "dutch_grants-5ehfqe",
            id: event.features[0].id,
        }, { hover: true });
        beforeMap.setFeatureState({
            source: "dutch_grants-5ehfqe-highlighted",
            sourceLayer: "dutch_grants-5ehfqe",
            id: dgrants_layer_view_id,
        }, { hover: false });
        beforeMap.setFeatureState({
            source: "dutch_grants-5ehfqe-highlighted",
            sourceLayer: "dutch_grants-5ehfqe",
            id: event.features[0].id,
        }, { hover: true });
        ["after", "before"].forEach(function (position) {
            var map = position === "after" ? afterMap : beforeMap;
            popupsObject["".concat(position, "HighMapGrantLotPopUp")]
                .setLngLat(event.lngLat)
                .setHTML(highPopUpHTML);
            if (!popupsObject["".concat(position, "HighMapGrantLotPopUp")].isOpen())
                popupsObject["".concat(position, "HighMapGrantLotPopUp")].addTo(map);
        });
    }
    dgrants_layer_view_id = event.features[0].id;
    dutch_grant_click_ev = true;
}
function closeNativeGroupsInfo() {
    $("#infoLayerNativeGroups").slideUp();
    native_group_layer_view_flag = false;
    afterMap.setFeatureState({
        source: "native-groups-area-highlighted",
        sourceLayer: "indian_areas_long_island-50h2dj",
        id: native_group_layer_view_id,
    }, { hover: false });
    beforeMap.setFeatureState({
        source: "native-groups-area-highlighted",
        sourceLayer: "indian_areas_long_island-50h2dj",
        id: native_group_layer_view_id,
    }, { hover: false });
    ["after", "before"].forEach(function (position) {
        if (popupsObject["".concat(position, "HighMapNativeGroupsPopUp")].isOpen())
            popupsObject["".concat(position, "HighMapNativeGroupsPopUp")].remove();
    });
}
function NativeGroupsClickHandle(event) {
    var highPopUpHTML = "";
    if (typeof taxlot_event_entities_info[event.features[0].properties.nid] ==
        "undefined" ||
        event.features[0].properties.nid == "") {
        highPopUpHTML =
            "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
                event.features[0].properties.name +
                "</div>";
    }
    else {
        highPopUpHTML =
            "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
                (taxlot_event_entities_info[event.features[0].properties.nid].name
                    .length > 0
                    ? taxlot_event_entities_info[event.features[0].properties.nid].name
                    : event.features[0].properties.name) +
                "</div>";
    }
    if (native_group_layer_view_id == event.features[0].id) {
        if (native_group_layer_view_flag) {
            if ($("#view-hide-layer-panel").length > 0)
                if (!layer_view_flag) {
                    $("#rightInfoBar").css("display", "block");
                    setTimeout(function () {
                        $("#rightInfoBar").slideUp();
                    }, 500);
                }
            closeNativeGroupsInfo();
        }
        else {
            buildPopUpInfo(event.features[0].properties, "#infoLayerNativeGroups");
            if ($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
                $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
            $("#infoLayerNativeGroups").slideDown();
            if ($("#view-hide-layer-panel").length > 0)
                if (!layer_view_flag)
                    $("#view-hide-layer-panel").trigger("click");
            native_group_layer_view_flag = true;
            afterMap.setFeatureState({
                source: "native-groups-area-highlighted",
                sourceLayer: "indian_areas_long_island-50h2dj",
                id: native_group_layer_view_id,
            }, { hover: true });
            beforeMap.setFeatureState({
                source: "native-groups-area-highlighted",
                sourceLayer: "indian_areas_long_island-50h2dj",
                id: native_group_layer_view_id,
            }, { hover: true });
            ["after", "before"].forEach(function (position) {
                var map = position === "after" ? afterMap : beforeMap;
                popupsObject["".concat(position, "HighMapNativeGroupsPopUp")]
                    .setLngLat(event.lngLat)
                    .setHTML(highPopUpHTML);
                if (!popupsObject["".concat(position, "HighMapNativeGroupsPopUp")].isOpen())
                    popupsObject["".concat(position, "HighMapNativeGroupsPopUp")].addTo(map);
            });
        }
    }
    else {
        buildPopUpInfo(event.features[0].properties, "#infoLayerNativeGroups");
        if ($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
            $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
        $("#infoLayerNativeGroups").slideDown();
        if ($("#view-hide-layer-panel").length > 0)
            if (!layer_view_flag)
                $("#view-hide-layer-panel").trigger("click");
        native_group_layer_view_flag = true;
        afterMap.setFeatureState({
            source: "native-groups-area-highlighted",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: native_group_layer_view_id,
        }, { hover: false });
        afterMap.setFeatureState({
            source: "native-groups-area-highlighted",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: event.features[0].id,
        }, { hover: true });
        beforeMap.setFeatureState({
            source: "native-groups-area-highlighted",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: native_group_layer_view_id,
        }, { hover: false });
        beforeMap.setFeatureState({
            source: "native-groups-area-highlighted",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: event.features[0].id,
        }, { hover: true });
        ["after", "before"].forEach(function (position) {
            var map = position === "after" ? afterMap : beforeMap;
            popupsObject["".concat(position, "HighMapNativeGroupsPopUp")]
                .setLngLat(event.lngLat)
                .setHTML(highPopUpHTML);
            if (!popupsObject["".concat(position, "HighMapNativeGroupsPopUp")].isOpen())
                popupsObject["".concat(position, "HighMapNativeGroupsPopUp")].addTo(map);
        });
    }
    native_group_layer_view_id = event.features[0].id;
    native_groups_click_ev = true;
}
function closeGrantLotsInfo() {
    $("#infoLayerGrantLots").slideUp();
    grant_lots_view_flag = false;
    ["after", "before"].forEach(function (position) {
        if (popupsObject["".concat(position, "HighGrantLotsPopUp")].isOpen())
            popupsObject["".concat(position, "HighGrantLotsPopUp")].remove();
    });
}
// #endregion
