
# Project File Structure Overview

  

  

## HTML Files



### index.html and mobile.html

  

These HTML files serve as the entry points for the website, with both versions tailored for desktop and mobile experiences. They provide meta tags for social sharing, Google Analytics, and links to external libraries like jQuery, FontAwesome, and Mapbox GL JS for interactive maps.

  

  

## Manifest File

  

  

### manifest.json

  

This JSON file is used to configure a Progressive Web App (PWA) version of the project. It specifies the app's name, theme colors, start URL, and icons for different device sizes.

  
  
  

  

## CSS Files

  

  

### index.css

  

Contains general styles for the desktop version of the site, such as the layout of the map, header, footer, tooltips, loading screens, and pop-up modals.

  

It also includes styles for various elements like the timeline slider, navigation panel, and responsiveness across different screen sizes.

  
  
  

  

### mobile.css

  

Focuses on the mobile layout with similar elements as the desktop version but optimized for smaller screens. It adjusts map positions, controls, and responsiveness for touch interactions and smaller viewports.

  

It also handles how elements like headers, footers, tooltips, and icons are displayed differently on mobile.

  

  

## JavaScript Files

  

  

### addMapLayer.js

  

Adds a map layer with optional date filtering based on start and end dates for visibility.

  

- addMapLayer(map, layerConfig, date)

-- **Purpose** Creates a HTML string that produces the map layer based on the date and layerconfig.

  

### generateLayers.js

  

Generates HTML for layer options, handling different types of layers such as "lots-events," "grants-lots," and "castello-points."

  

- renderManhattanLayers(layers)

-- **Input:** The type of an array of layers to generate HTML and what it should show for Manhattan.

-- **Output:** A string of html

  

- renderLongIslandLayers(layers)

-- **Input:** Based on an array of layers, it creates a HTML string that renders Long Island.

-- **Output:** a string of html

  

- renderLayerRow(layerData, isMinus=false)

-- **Purpose:** Creates HTML string for a row in a layer list, including interactive elements like checkboxes, expand/collapse icons, zoom buttons, and info icons.

-- **Flexibility:** It customizes the HTML based on the properties provided in `layerData` and allows for different configurations and actions based on the layer type and attributes.

-- **Usage:** This function would be used in a context where you need to dynamically generate rows for a layer list, such as in a web-based mapping or data visualization application

  

- renderManahattaLayerItem(layerData)

-- **Purpose:** This function constructs and returns an HTML string for a list row that includes a checkbox, an icon, and a label, with various customizable properties based on the `layerData` object.

-- **Customization:** It allows for dynamic styling and functionality by using properties from `layerData` to set classes, IDs, names, icon types, and colors.

  

- renderCirclePointLayerRow(layerData)

-- **Purpose:** This function creates an HTML string for a row in a list that includes a checkbox, an icon, and buttons for zooming and viewing information about the layer.

-- **Customization:** It allows customization of various elements based on properties from `layerData`, including checkbox state, icon color, and the label text.

  

- renderGrantLotsLayerRow(layerData)

-- **Purpose:** The function constructs an HTML string for a row in a list that includes a checkbox, an icon, and buttons for zooming and getting information about the layer.

-- **Customization:** It uses properties from `layerData` to dynamically set attributes and content, including the checkbox ID and name, icon color, label text, and button actions.

  
  

- renderCastelloPointsLayerRow(layerData)

-- **Purpose:** dynamically generates an HTML row for displaying a layer in a list. It uses the properties from the layerData object to customize the row, including setting default values where necessary. The row includes:

**Customization:** It uses properties from `layerData` to dynamically set attributes and content, including the checkbox ID and name, icon color, label text, and button actions.

  
  

- try catch statement

-- **Purpose** Runs the fucntions above and checks if there are any errors returns a error message to the console. Otherwise, reports to the console that it successfully ran

### generateMaps.js

Creates the HTML structure for map layers and their interactive controls like zoom and info buttons.

- generateMapHTML(map)
-- The `generateMapHTML` function builds an HTML snippet that represents a map layer item. It includes radio buttons for toggling the layer, a label showing the layer's name, and buttons for zooming to the layer and viewing additional information. The function dynamically populates these elements based on the properties provided in the `map` object.
  
 - Bottom bit
  -- This code updates the HTML content of an element with the ID `castello-maps-section` by generating HTML for each map layer in the `castelloMaps` array and then combining those HTML strings into one continuous string to be inserted into the element.

### getLayer.js
- getLayer(layerId)
-- Fetches a specific layer configuration based on its ID.
  

### google-analytics.js

Integrates Google Analytics tracking into the project.

### handle-mobile-devices.js


Detects mobile devices and redirects to a mobile-specific page if necessary.

### index.js

Main JavaScript file for handling interactions like layer visibility, date sliders, tooltips, and responsiveness across different window sizes.

- Init Function
	-- This function is to set up the default page and call the helpper functions.

### layerFlags.js

Stores flags and IDs for tracking the visibility and interaction of various layers.


### layerSectionData.js

  

Contains metadata for different layer sections like "Dutch Grants," "Castello Points," and "Native Groups" for Manhattan and Long Island.


### layersFunctions.js

  

Defines event listeners for map layers and adds or removes map layers based on specific configurations.

- setupLayerEvents(map, layers)
-- **Purpose:** This function manages mouse events (movement, click, and exit) and pop up events. does this by going through all the layers and checking.

- addMapLayers(map, layers, date)
--	**Purpose:** This function iterates through the provided layers and adds each one to the specified map, using the given date. The check against `beforeMap` appears redundant because the action taken is identical in both cases.

- addAllLayers(yr, date)
-- **Purpose:** This function is an updaters to the map. it will close are exsiting layers and then open the needed layers. 

### layersList.js

Contains the configuration for different map layers, specifying how they should appear on the map (e.g., Dutch Grants, native groups) and their visibility depending on user interactions.

### mapData.js

Holds the data for various maps, such as Castello Maps, with specific identifiers and functions to handle zoom and map switching.

### mapinit.js

Initializes the Mapbox GL maps and sets up navigation controls, dynamic filtering, and style switching for before/after map comparisons.

- switchRightLayer(layer)
-- The function updates the style of `afterMap` by setting it to a new style URL based on the class name of the element that triggered the function. This allows for dynamic switching of map styles based on user interaction or other events.

- switchLeftLayer(layer) 
-- The function updates the style of `beforeMap` by setting it to a new style URL based on the class name of the element that triggered the function. This allows for dynamic switching of map styles based on user interaction or other events.

- demoFilterRangeCalc()
-- The function calculates the earliest and latest dates (as Unix timestamps) from the features in the `"lot_events-bf43eb"` layer of `afterMap` for a specific `TAXLOT`. It then sets these dates as the range for a slider, which is presumably used to filter or display data. If applicable, it also updates the UI to show additional information about the feature.

4o mini

- addlayers()
--The function updates the maps with new layers based on a selected date and adds interactive labels to both `afterMap` and `beforeMap`. It uses the current date from the UI to determine which layers to display and creates labels with interactivity for both maps.

- addLayersOnLoad()
-- This function waits a some time before starting a load process.

### mobile.js

Detects whether the user is on a mobile device and handles redirection to the appropriate page depending on screen size.

### modalinfo.js

Fetches and displays information from an external API for populating modals (popups) with content like Dutch Grants and settlement information.

- getInfoText(modal_header_text, modal_content_html)
-- The function makes an AJAX GET request to a specified API endpoint to retrieve JSON data. It then populates two objects, `modal_header_text` and `modal_content_html`, with the retrieved data, specifically the titles and bodies of items, respectively. If the request fails, it logs the error information for debugging.

### popupContent.bak.js

Defines configurations for popups based on different layers (e.g., Dutch Grants, Taxlots, Native Groups), specifying how data should be displayed when interacting with the map.

- handleClick(event, layerKey) 
  -- the function manages the display of a popup or information panel when a feature on a map is clicked. It determines whether to show or hide the panel based on whether the clicked feature is the same as the currently displayed one. It also ensures the correct feature information is shown and manages view flags to track which feature is currently being viewed.

- toggleLayerPanel(show) 
-- The function manages the visibility of the `#rightInfoBar` element based on the `show` parameter. If the conditions specified in the `if` statement are met (element exists and the view flag differs from `show`), it will:

	1.  Set the display property of `#rightInfoBar` to either `block` or `none` depending on `show`.
	2.  After a delay of 500 milliseconds, animate the `#rightInfoBar` element to slide up, likely to smoothly hide it.

	The purpose is to toggle the visibility of the `#rightInfoBar` with a sliding effect, providing a smooth user experience when showing or hiding the panel.

- 
-- The `updateLayerViewFlag` function updates the state of a specific feature in both `afterMap` and `beforeMap` maps by:

1.  Generating a `sourceKey` for identifying the feature layer.
2.  Creating a configuration object with the `sourceKey` and the feature ID.
3.  Using this configuration to set the feature state (`hover` status) on both maps.

	This function is useful for synchronizing feature states across different views of the map, such as when highlighting a feature on hover or selection.

- generatePopupContent(id, features)
-- The function `generatePopupContent` takes an `id` and an array of `features`, retrieves a template based on the `id`, and replaces placeholders in the template with actual property values from the features. If no configuration is found for the `id`, it returns `null`. This is typically used to create dynamic popup content for map features or similar UI elements.

- createPopup(offset  =  0)
-- The `createPopup` function initializes and returns a `mapboxgl.Popup` object with customized settings. The popup will not have a close button, will not close when clicking outside of it, and will use the specified `offset` for positioning. If no `offset` is provided, it defaults to `0`.

- DefaultHandle()
-- sets the default popup settings

- closeCastelloInfo()
-- The `closeCastelloInfo` function hides the Castello information layer, updates the flag indicating whether the Castello layer is being viewed, and removes any open popups related to the Castello layer from both the `"after"` and `"before"` views.

- CastelloClickHandle(event)
-- The `CastelloClickHandle` function manages the user interaction with Castello features on a map. It:

	1. Handles clicks on features by checking if the same feature was clicked again or if a new feature was selected.
	2. Manages the display and content of popups and an information panel based on the clicked feature.
	3. Adjusts the map's popup position if necessary and updates the visibility of the information panel.

	Overall, it ensures that the correct feature information is displayed and that UI elements are updated appropriately based on user interactions.

- closeDemoInfo()
-- checks if demopopups is open and if it is it closes it

- DemoClickHandle(event)
-- The function manages the user interaction with features in the Demo layer on a map. It:

	1.   Checks if the Demo layer is currently active and handles visibility changes and information updates accordingly.
	2.  Updates the content of the `#demoLayerInfo` element and manages its display.
	3.   Configures and displays popups for the clicked feature on two maps (`beforeMap` and `afterMap`), ensuring correct positioning and content.

- closeDutchGrantsInfo()
-- The `closeDutchGrantsInfo` function:

	1.  Hides the Dutch grants information panel by sliding it up.
	2.  Updates the `dgrants_layer_view_flag` to indicate that the Dutch grants layer is no longer active.
	3.   Resets the feature state for the Dutch grants layer on both `afterMap` and `beforeMap` to remove highlighting or hover effects.
	4.   Removes any open popups related to Dutch grants from both map views.

	This function ensures that all elements related to the Dutch grants layer are properly closed and cleaned up when the user no longer needs to view the information.

- DutchGrantsClickHandle(event)
-- The `DutchGrantsClickHandle` function manages interactions with Dutch grant lot features on a map. When a feature is clicked, it generates and displays popup content based on the feature's properties. If the clicked feature is already being viewed (`dgrants_layer_view_id` matches), the function either hides the current view if it is active or updates and displays the information panel and popups if it is not. It ensures that the information panel is moved to the top if necessary and manages the visibility of popups on both the "before" and "after" maps. If the clicked feature is different from the currently viewed one, the function updates the feature state for highlighting and adjusts the popup content accordingly. The function also updates flags and states to track the current view and interaction status.

- closeNativeGroupsInfo()
-- The `closeNativeGroupsInfo` function is responsible for closing the information display related to Native Groups on the map. It performs the following tasks:

	1.  **Hide Information Panel:** It hides the HTML element with the ID `infoLayerNativeGroups` by sliding it up.
	2.  **Update View Flag:** It sets the `native_group_layer_view_flag` to `false`, indicating that the Native Groups layer is no longer active.
	3.  **Reset Feature State:** It updates the feature state on both `afterMap` and `beforeMap` to remove any highlighting or hover effects for the feature identified by `native_group_layer_view_id`.
	4.  **Remove Popups:** It iterates over the "before" and "after" map views, and if any popups related to Native Groups are open, it removes them.

	This function ensures that all related elements and states are properly cleared when the user no longer needs to view the Native Groups information.

- NativeGroupsClickHandle(event)
-- The `NativeGroupsClickHandle` function manages the interaction with Native Groups features on a map. When a Native Group feature is clicked, it first determines the content for the popup based on whether additional information is available. If the feature is already being viewed (identified by `native_group_layer_view_id`), it either closes the currently displayed information if it's active or updates and shows it if it's not. If the feature is new, it updates the information panel, displays the popup on both the "before" and "after" maps, and adjusts feature states to highlight the newly clicked feature while removing the highlight from the previously viewed feature. This ensures the correct information is displayed and the feature's state is appropriately managed.

- closeGrantLotsInfo()
-- The `closeGrantLotsInfo` function is designed to handle the closure of information related to Grant Lots on a map. It performs the following actions:

	1.  **Hide Information Panel:** It hides the HTML element with the ID `infoLayerGrantLots` by sliding it up, which effectively makes it disappear from view.
	2.  **Update View Flag:** It sets the `grant_lots_view_flag` to `false`, indicating that the Grant Lots information is no longer being viewed.
	3.  **Remove Popups:** It iterates over the "after" and "before" map views and removes any open popups related to Grant Lots from both maps.

	This function ensures that all elements related to Grant Lots are properly hidden and cleaned up when the user no longer needs to view the information.


### popupContent.js

Similar to popupContent.bak.js, it defines popup configurations for various map layers and handles the generation of dynamic popup content on user interaction.

### popupDisplayFunctions.js

Initializes popups for the map and handles display settings, such as removing the close button and controlling hover behavior.

### removeMapSourceLayer.js

Provides a utility function to remove layers or sources from the map by checking the type (source or layer) and calling the appropriate Mapbox removal function.

- removeMapSourceLayer(map, points)
-- The function is used to remove sources or layers from a Mapbox map. Here's a summary of what it does:

1.  **Iterate Through Points:** It processes each item in the `points` array.
2.  **Remove Source:** If the item is of type `"source"`, it checks if the map has a source with the specified `id` and removes it if it exists.
3.  **Remove Layer:** If the item is of type `"layer"`, it checks if the map has a layer with the specified `id` and removes it if it exists.

### retreiveLayersInfo.js

Fetches detailed layer information from external APIs and populates the map with this data, including Dutch Grants, settlements, and taxlot events.

- handleAjaxError(xhr, textStatus)
-- handles error with this API

- getDutchGrantsInfo()
-- The `getDutchGrantsInfo` function retrieves Dutch Grants data from a remote server and processes it to populate the `dutch_grant_lots_info` object.  this function essentially populates the `dutch_grant_lots_info` object with structured data from the server, which can then be used elsewhere in the application.

- getSettlementsInfo()
-- The `getSettlementsInfo` function retrieves settlement information from a specified API endpoint using a GET request. Upon a successful response, it processes the data to populate the `settlements_info` object with various details for each settlement, including name, current location (with optional link), date, description, and images. It also updates the `settlements_linked_location` object with the settlement titles indexed by their IDs. The function keeps track of the total number of settlements processed with the `settlements_info_length` variable. In case of an error during the AJAX request, a function `handleAjaxError` is called to manage the failure.
 
 - getTaxlotEventEntitiesDescrInfo()
 -- The `getTaxlotEventEntitiesDescrInfo` function fetches tax lot event entities data from a specified API using a GET request. On successful retrieval, it processes the data to populate the `taxlot_event_entities_info` object with details such as the entity name, a potential HTML link to its detailed page, and a description. The `taxlot_entities_info_length` variable is incremented for each entity processed. If the request fails, it triggers the `handleAjaxError` function to manage the error.

- getTaxlotEventsInfo()
-- The `getTaxlotEventsInfo` function retrieves tax lot event data from an API via a GET request. On a successful response, it processes each data entry to populate the `taxlot_events_info` object with detailed information, including title, start and end dates, tax lot and event fields, and various party-related fields. It also formats these fields to include hyperlinks with specific target attributes. The `taxlot_events_info_length` variable is incremented for each entry processed. If the request fails, the `handleAjaxError` function is called to handle the error.

- getInfosEntity()
-- The `getInfosEntity` function makes a GET request to an API to fetch data about information entities. On a successful response, it processes each entry to populate the `infos_entity` object with details such as the entity's name, an HTML link to the entity's page, and its description. It uses `data_info_index` to index the information by entity ID and increments the `infos_entity_length` variable for each entry processed. If the request fails, it invokes the `handleAjaxError` function to manage the error.

- getBrooklynGrantsInfo()
-- The `getBrooklynGrantsInfo` function retrieves Brooklyn grants data from an API using a GET request. Upon successful response, it processes the data to populate the `brooklyn_grants_info` object with details such as the grant name, start date, and information about the involved parties, including names and linked URLs. The function also captures the names of indigenous signatories. Each entry is indexed by its ID, and the `brooklyn_grants_length` variable is incremented for each processed grant. If the request fails, the `handleAjaxError` function is called to handle the error.

- getLotsInfo()
-- The `getLotsInfo` function retrieves data from an API endpoint about lots and processes it to populate the `lots_info` object. It handles entries based on the content type and specific conditions, such as renaming certain entries (e.g., "FortAmsterdam" to "Fort Amsterdam"). For each lot, it captures details including name, title (with a formatted HTML link), Brooklyn title, parties involved (with linked URLs), start and end dates, indigenous signatories, description, and related building information. The function also includes additional fields like secondary party links and texts. It increments the `lots_info_length` counter for each processed entry and calls `handleAjaxError` in case of a request failure.

### sliderpopups.js

Handles the display of popups when interacting with map elements based on a slider. It fetches and displays data such as Dutch Grant and Castello Taxlot information in popups.

### timeLayers.js

Provides time-based filtering for specific map layers, such as Dutch Grants, by setting a date filter to adjust the visibility of layers according to the selected time period.

- changeDate(unixDate)
-- The `changeDate` function updates map filters based on a given Unix timestamp. It converts the timestamp to a date in `YYYYMMDD` format and creates a filter that selects records where the date is within the range defined by `DayStart` and `DayEnd`. This filter is then applied to several map layers, including `"dutch_grants-5ehfqe"`, `"dutch_grants-5ehfqe-highlighted"`, `"grant-lots-lines"`, and `"lot_events-bf43eb"`. Finally, it invokes `demoFilterRangeCalc()` to recalculate or update the demo filter range based on the new date settings.

### utils.js

Contains various utility functions, including tooltips for map elements, handling the size of arrays, and collapsing/expanding sections of the user interface.

- simple_tooltip(target_items, name)
-- The `simple_tooltip` function creates and manages custom tooltips for elements matching the `target_items` selector. For each element, it appends a `div` to the body with the specified `name` class and a unique ID. This `div` displays the element's `title` attribute as the tooltip text and is styled to appear as a tooltip. The function then removes the `title` attribute from the element to prevent default browser tooltips. Event handlers are set up to display the custom tooltip on mouseover, position it near the cursor on mousemove, and hide it on mouseout. The tooltip fades in and out with animation for a smooth user experience.

- sizeOfArray(array)
-- gets the size of an array lol

- itemsCompressExpand(items_class, caret_id)
-- The `itemsCompressExpand` function toggles the visibility of elements based on the state of a caret icon. If the caret icon (identified by `caret_id`) has the class `"fa-minus-square"`, it changes to `"fa-plus-square"` and hides the elements with the class `items_class`. Conversely, if the caret icon has the class `"fa-plus-square"`, it switches to `"fa-minus-square"` and shows the elements. This function effectively toggles between expanded and compressed states for the targeted content.

- sectionCompressExpand(section_id, caret_id)
-- The `sectionCompressExpand` function manages the visibility of a section and updates a caret icon to indicate the current state. If the caret icon (identified by `caret_id`) has the class `"fa-minus-square"`, it changes to `"fa-plus-square"` and slides up (hides) the section specified by `section_id`. Conversely, if the caret icon has the class `"fa-plus-square"`, it changes to `"fa-minus-square"` and slides down (shows) the section. This function provides a smooth transition effect for expanding or collapsing content sections.

### zoomFunctions.js

Implements zoom controls for the map, allowing zooming to predefined bounds (e.g., Long Island, Manhattan) or centering on specific areas like New Amsterdam. It also manages visibility settings for labels based on zoom levels.

- testZoom()
-- The `testZoom` function adjusts the zoom level of two maps, `beforeMap` and `afterMap`, to focus on a predefined bounding box representing the Dutch grants area. It first retrieves the current bearing of the `beforeMap` to ensure that the orientation remains consistent. Then, it defines the bounding box coordinates (`TestBounds`) and uses these coordinates to zoom both maps to the specified bounds while preserving the existing bearing. This ensures that the maps are oriented correctly and focused on the Dutch grants region.

- zoomtobounds(boundsName)
-- The `zoomLabels` function manages the visibility of zoom labels on both the `beforeMap` and `afterMap` based on the provided option (`sel_opt`). If the option is `"show"`, the function iterates through the `labelData` array, constructs an ID for each label by transforming the title into a suitable format, and sets the visibility of the corresponding map layers to `"visible"` for both maps. It then updates the user interface to display the button for hiding zoom labels and hides the button for showing them. Conversely, if the option is not `"show"`, the function hides all zoom labels by setting their visibility to `"none"` and updates the UI to reflect this change, showing the button to display zoom labels and hiding the button to hide them.

### zoomLabels.js

Contains label data for map regions (e.g., Long Island, Brooklyn) with coordinates and minimum zoom levels required for the labels to appear.
### zoomLabelsFunctions.js

Handles the creation of labels for different map regions and adds interactivity, such as changing label colors on hover and zooming to the corresponding area on click.

- createLabel(title, coordinates, minZoom = null)
-- The `createLabel` function is designed to generate a configuration object for adding a label to a map. It takes a `title`, `coordinates`, and optionally a `minZoom` value. The function constructs a unique ID for the label by converting the title to lowercase and replacing spaces with hyphens. The label is represented as a `symbol` type layer with a GeoJSON data source, which includes the label's coordinates and properties. If a `minZoom` value is provided, it is included in the configuration. The label's layout properties specify the text font, size, and visibility, while the paint properties define its color, halo effects, and opacity settings, with a default opacity of 1 that transitions to 0 at zoom levels below 6.

---

## User Interaction Flow


### 1. Initial Page Load (index.html)

  

**Loading the HTML:**

  

The browser loads `index.html`, which sets up the structure of the page, linking to various external files such as CSS for styling (`index.css`) and JavaScript files located in the `./js/` folder.

  

  

**CSS Application (index.css):**

  

The layout of the map, timeline, sidebars, and other elements is governed by `index.css`. Depending on the layout, users will see elements like a timeline slider for time-based data and layer selectors to toggle map layers.

  

  

---

  

  

### 2. Map Initialization (mapinit.js)

  

**Mapbox Initialization:**

  

`mapinit.js` initializes two Mapbox GL maps (beforeMap and afterMap) for comparing datasets. The user sees an interactive map centered on New Amsterdam, with controls for zoom and rotate.

  

  

**Layer Selection:**

  

Users can toggle between different layers, such as Dutch Grants and native groups, using the provided controls.

  

  

---

  

  

### 3. Map Layer Controls (layersFunctions.js, generateLayers.js)

  

**Generating Layer Toggles:**

  

`generateLayers.js` dynamically creates the layer controls, while `layersFunctions.js` listens for user input to add or remove layers from the map.

  

  

---

  

  

### 4. Time-based Filtering (timeLayers.js)

  

**Timeline Interaction:**

  

A time slider lets users filter map data by date. `timeLayers.js` adjusts the visible data accordingly, making certain layers appear or disappear based on the selected time.

  

  

---

  

  

### 5. Popups for Map Features (popupContent.js, sliderpopups.js)

  

**Popup Interaction:**

  

When a user clicks on a map feature, `popupContent.js` shows detailed information in a popup, and `sliderpopups.js` loads additional data if needed.

  

  

---

  

  

### 6. Zoom and Label Interactions (zoomFunctions.js, zoomLabels.js)

  

**Zoom Functionality:**

  

`zoomFunctions.js` zooms the map based on user interaction with labels or regions. `zoomLabels.js` ensures that labels are shown at the appropriate zoom levels.

  

  

---

  

  

### 7. Mobile Handling (handle-mobile-devices.js, mobile.css)

  

**Device Detection:**

  

`handle-mobile-devices.js` detects mobile devices and redirects to the mobile page. `mobile.css` refines the layout for smaller screens and touch interactions.

  

  

---

  

  

### 8. Analytics Tracking (google-analytics.js)

  

**Tracking User Behavior:**

  

`google-analytics.js` collects data on user interactions and sends it to Google Analytics for analysis. 