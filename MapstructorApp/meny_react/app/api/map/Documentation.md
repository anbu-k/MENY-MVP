
# MENY Map API

An API for storing and retreiving maps for the MENY interface.

  

## REST API

  

### GET

**Purpose:** To get all the maps in the database

- Inputs: none

- Outputs: gives a JSON object of all the maps

  

### POST

**Purpose:** To create a new map record in the database

#### Inputs: JSON
	{
	- groupName: String,

	- label: String,

	- mapId: String,

	- maps: Map[

		- longitude: Float,

		- latitude: Float,

		- mapName: String,

		- zoom: Float,

		- bearing: Float,

		- styleId: String

	]

	- MapFilterItems: [

		- itemName: String,

		- label: String,

		- defaultCheckedForBeforeMap: Boolean,

		- defaultCheckedForAfterMap: Boolean,

		- showInfoButton: Boolean,

		- showZoomButton: Boolean

	]
	}
- Outputs: Sends the newly generated id: String

**Exsample:** what to send to the sever

```

{

"groupName": "Example Group",

"label": "Example Label",

"mapId": "unique-map-id-111",

"maps": [

{

"longitude": 34.0522,

"latitude": -118.2437,

"mapName": "Los Angeles Map",

"zoom": 10.0,

"bearing": 0.0,

"styleId": "style-id-789"

}

],

"MapFilterItems": [

{

"itemName": "Filter Item 1",

"label": "Label 1",

"defaultCheckedForBeforeMap": true,

"defaultCheckedForAfterMap": false,

"showInfoButton": true,

"showZoomButton": false

},

{

"itemName": "Filter Item 2",

"label": "Label 2",

"defaultCheckedForBeforeMap": false,

"defaultCheckedForAfterMap": true,

"showInfoButton": false,

"showZoomButton": true }

]

}

  

```

### ~~ DELETE ~~

**Purpose:** To delete a map record in the database

- Inputs: JSON with id:int, name:String, checked:Boolean, infoId:String, and zoomFunction:String

- Outputs: gives a JSON object of the new map that was send

**Exsample:** what to send to the sever

```

{

"id": 121

}

```

### ~~ PUT ~~

**Purpose:** To delete a map record in the database

- Inputs: JSON with id:Int, name?:String, checked?:Boolean, infoId?:String, and zoomFunction?:String

- Outputs: gives a JSON object of the new map that was saved

**Exsample:** what to send to the sever

```

{

"id": 121,

"name": "new name for map"

}

```