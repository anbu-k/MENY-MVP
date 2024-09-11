
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

- unction  setupLayerEvents(map, layers)
--  **`getPopupByName(layer.popup)`:** Presumably retrieves a popup instance by name.
--   **`generatePopupContent(layer.id, e.features)`:** Likely generates HTML content for the popup based on the layer and features.
--  **`map.setFeatureState()`:** Updates the state of a specific feature, such as its hover state.

In summary, this code provides interactive behavior for map features: it changes the cursor, displays popups, and manages feature states based on mouse events.
  

  

### layersList.js

  

Contains the configuration for different map layers, specifying how they should appear on the map (e.g., Dutch Grants, native groups) and their visibility depending on user interactions.

  

*(layersList)*

  

  

### mapData.js

  

Holds the data for various maps, such as Castello Maps, with specific identifiers and functions to handle zoom and map switching.

  

*(mapData)*

  

  

### mapinit.js

  

Initializes the Mapbox GL maps and sets up navigation controls, dynamic filtering, and style switching for before/after map comparisons.

  

*(mapinit)*

  

  

### mobile.js

  

Detects whether the user is on a mobile device and handles redirection to the appropriate page depending on screen size.

  

*(mobile)*

  

  

### modalinfo.js

  

Fetches and displays information from an external API for populating modals (popups) with content like Dutch Grants and settlement information.

  

*(modalinfo)*

  

  

### popupContent.bak.js

  

Defines configurations for popups based on different layers (e.g., Dutch Grants, Taxlots, Native Groups), specifying how data should be displayed when interacting with the map.

  

*(popupContent.bak)*

  

  

### popupContent.js

  

Similar to popupContent.bak.js, it defines popup configurations for various map layers and handles the generation of dynamic popup content on user interaction.

  

*(popupContent)*

  

  

### popupDisplayFunctions.js

  

Initializes popups for the map and handles display settings, such as removing the close button and controlling hover behavior.

  

*(popupDisplayFunctions)*

  

  

### removeMapSourceLayer.js

  

Provides a utility function to remove layers or sources from the map by checking the type (source or layer) and calling the appropriate Mapbox removal function.

  

*(removeMapSourceLayer)*

  

  

### retreiveLayersInfo.js

  

Fetches detailed layer information from external APIs and populates the map with this data, including Dutch Grants, settlements, and taxlot events.

  

*(retreiveLayersInfo)*

  

  

### sliderpopups.js

  

Handles the display of popups when interacting with map elements based on a slider. It fetches and displays data such as Dutch Grant and Castello Taxlot information in popups.

  

*(sliderpopups)*

  

  

### timeLayers.js

  

Provides time-based filtering for specific map layers, such as Dutch Grants, by setting a date filter to adjust the visibility of layers according to the selected time period.

  

*(timeLayers)*

  

  

### utils.js

  

Contains various utility functions, including tooltips for map elements, handling the size of arrays, and collapsing/expanding sections of the user interface.

  

*(utils)*

  

  

### zoomFunctions.js

  

Implements zoom controls for the map, allowing zooming to predefined bounds (e.g., Long Island, Manhattan) or centering on specific areas like New Amsterdam. It also manages visibility settings for labels based on zoom levels.

  

*(zoomFunctions)*

  

  

### zoomLabels.js

  

Contains label data for map regions (e.g., Long Island, Brooklyn) with coordinates and minimum zoom levels required for the labels to appear.

  

*(zoomLabels)*

  

  

### zoomLabelsFunctions.js

  

Handles the creation of labels for different map regions and adds interactivity, such as changing label colors on hover and zooming to the corresponding area on click.

  

*(zoomLabelsFunctions)*

  

  

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