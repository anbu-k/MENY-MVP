// world bounds
const WorldBounds = [
    [-179,-59], // [west, south]
    [135,77]  // [east, north]
];

// area bounds
	var LongIslandBounds = [[-74.0419692,40.5419011],[-71.8562705,41.161155]],
	    NAbounds = [[-74.0147037576672,40.702706170726174],[-74.00814312149578,40.7080579912966]],
        ManhattanBounds = [[-74.04772962697074,40.682916945445164],[-73.90665099539478,40.879038046804695]],
		NYCbounds = [[-74.25559136315213,40.496133987611834],[-73.7000090638712,40.91553277650267]],
		BronxBounds = [[-73.93360592036706,40.785356620508495],[-73.76533243995276,40.91553277650267]],
		BrooklynBounds = [[-74.04189660705046,40.56952999398417],[-73.8335592388046,40.73912795313439]],
		QueensBounds = [[-73.96262015898652,40.54183396045311],[-73.7000090638712,40.80101146781903]],
		StatenIslandBounds = [[-74.25559136315213,40.496133987611834],[-74.04923629842045,40.648925552276076]],
		NewNLbounds = [[-75.5588888888889,39.5483333333333],[-71.6483333333333,42.64485]],
		NewEnglandBounds = [[-73.6468505859375, 41.017210578228436],[-69.708251953125,43.97700467496408]];

/////////////////////////////
//ACCESS TOKEN
/////////////////////////////

mapboxgl.accessToken =
	"pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ";




/////////////////////////////
//ADD MAP CONTAINER
/////////////////////////////
           var na_bearing = -51.3,
		    na_center = [-74.01255, 40.704882],
			na_zoom = 16.34;


        var beforeMap = new mapboxgl.Map({
            container: 'before',
            style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
            center: na_center,
            hash: true,
            zoom: 7,
			attributionControl: false
        });

        var afterMap = new mapboxgl.Map({
            container: 'after',
            style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
            center: na_center,
            hash: true,
            zoom: 7,
			attributionControl: false
        });

        var map = new mapboxgl.Compare(beforeMap, afterMap, {
            // Set this to enable comparing two maps by mouse movement:
            // mousemove: true
        });

        // Set the map's max bounds
		/*
		beforeMap.setMaxBounds(WorldBounds);
        afterMap.setMaxBounds(WorldBounds);
        */
        /////////////////////////////
        //ADD NAVIGATION CONTROLS (ZOOM IN AND OUT)
        /////////////////////////////
        //Before map
        var nav = new mapboxgl.NavigationControl();
        beforeMap.addControl(nav, "bottom-right");
		
        //After map
        var nav = new mapboxgl.NavigationControl();
        afterMap.addControl(nav, "bottom-right");
		


		
        //zoomtocenter('NA');
		zoomtobounds('Brooklyn');


		
        function zoomtobounds(boundsName){
			switch(boundsName){
				case 'LongIsland':
				if(windoWidth <= 637) {
					beforeMap.fitBounds(LongIslandBounds, {bearing: 0});
				    afterMap.fitBounds(LongIslandBounds, {bearing: 0});
				} else {
			        beforeMap.fitBounds(LongIslandBounds, {bearing: 0, padding: {top: 5, bottom:5, left: 350, right: 5}});
				    afterMap.fitBounds(LongIslandBounds, {bearing: 0, padding: {top: 5, bottom:5, left: 350, right: 5}});
				}
				break;
				case 'Brooklyn':
			    beforeMap.fitBounds(BrooklynBounds, {bearing: 0});
				afterMap.fitBounds(BrooklynBounds, {bearing: 0});
				break;
				case 'NYC':
			    beforeMap.fitBounds(NYCbounds, {bearing: 0});
				afterMap.fitBounds(NYCbounds, {bearing: 0});
				break;
				case 'NewNL':
			    beforeMap.fitBounds(NewNLbounds, {bearing: 0});
				afterMap.fitBounds(NewNLbounds, {bearing: 0});
				break;
				case 'NewEngland':
			    beforeMap.fitBounds(NewEnglandBounds, {bearing: 0});
				afterMap.fitBounds(NewEnglandBounds, {bearing: 0});
				break;
				case 'Manhattan':
			    beforeMap.fitBounds(ManhattanBounds, {bearing: na_bearing});
				afterMap.fitBounds(ManhattanBounds, {bearing: na_bearing});
				break;
				case 'NewAmsterdam':
			    beforeMap.fitBounds(NAbounds, {bearing: na_bearing});
				afterMap.fitBounds(NAbounds, {bearing: na_bearing});
				break;
				case 'World':
			    beforeMap.fitBounds(WorldBounds, {bearing: 0});
				afterMap.fitBounds(WorldBounds, {bearing: 0});
				break;
			}
			console.warn(boundsName);
		}
		
		function zoomtocenter(centerName){
			switch(centerName){
				case 'NA':
			    beforeMap.easeTo({center: na_center, zoom: na_zoom, bearing: na_bearing, pitch: 0});
			    afterMap.easeTo({center: na_center, zoom: na_zoom, bearing: na_bearing, pitch: 0});
				break;
				case 'Manatus Map':
			    beforeMap.easeTo({center: [-73.9512,40.4999], zoom: 9, bearing: -89.7, pitch: 0});
			    afterMap.easeTo({center: [-73.9512,40.4999], zoom: 9, bearing: -89.7, pitch: 0});
				break;
				case 'Original Grants':
			    beforeMap.easeTo({center: [-73.9759,40.7628], zoom: 12, bearing: -51.3, pitch: 0});
			    afterMap.easeTo({center: [-73.9759,40.7628], zoom: 12, bearing: -51.3, pitch: 0});
				break;
				case 'NYC plan':
			    beforeMap.easeTo({center: [-74.01046,40.70713], zoom: 15, bearing: -51.3, pitch: 0});
			    afterMap.easeTo({center: [-74.01046,40.70713], zoom: 15, bearing: -51.3, pitch: 0});
				break;
				case 'Ratzer Map':
			    beforeMap.easeTo({center: [-74.00282,40.69929], zoom: 12, bearing: -6.5, pitch: 0});
			    afterMap.easeTo({center: [-74.00282,40.69929], zoom: 12, bearing: -6.5, pitch: 0});
				break;
				case 'Long Island':
			    beforeMap.easeTo({center: [-73.094,41.1], zoom: 8, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.094,41.1], zoom: 8, bearing: 0, pitch: 0});
				break;
				case 'NY Bay':
			    beforeMap.easeTo({center: [-73.9998,40.6662], zoom: 11, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.9998,40.6662], zoom: 11, bearing: 0, pitch: 0});
				break;
				case 'Gravesend Map':
			    beforeMap.easeTo({center: [-73.97629,40.60105], zoom: 13, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.97629,40.60105], zoom: 13, bearing: 0, pitch: 0});
				break;
				case 'Long Island 1873':
			    beforeMap.easeTo({center: [-73.2739,40.876], zoom: 8.6, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.2739,40.876], zoom: 8.6, bearing: 0, pitch: 0});
				break;
				case 'Belgii Novi':
			    beforeMap.easeTo({center: [-74.39,40.911], zoom: 5.7, bearing: -7.2, pitch: 0});
			    afterMap.easeTo({center: [-74.39,40.911], zoom: 5.7, bearing: -7.2, pitch: 0});
				break;
				case 'New England':
			    beforeMap.easeTo({center: [-72.898,42.015], zoom: 7, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-72.898,42.015], zoom: 7, bearing: 0, pitch: 0});
				break;
				case 'Pipeline':
				beforeMap.easeTo({center: [-96.16,43.68], zoom: 5.1, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-96.16,43.68], zoom: 5.1, bearing: 0, pitch: 0});
				break;
				case 'StandingRockBorders':
				beforeMap.easeTo({center: [-101.216,45.94], zoom: 8.1, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-101.216,45.94], zoom: 8.1, bearing: 0, pitch: 0});
				break;
				case 'LawsuitEvents':
				beforeMap.easeTo({center: [-101.1374,46.6248], zoom: 8.74, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-101.1374,46.6248], zoom: 8.74, bearing: 0, pitch: 0});
				break;
				case 'ProtestCamps':
				beforeMap.easeTo({center: [-100.62888,46.42026], zoom: 14, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-100.62888,46.42026], zoom: 14, bearing: 0, pitch: 0});
				break;
				case 'CulturalSites':
				beforeMap.easeTo({center: [-100.64988,46.45797], zoom: 14.48, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-100.64988,46.45797], zoom: 14.48, bearing: 0, pitch: 0});
				break;
				case 'WaterSources':
				beforeMap.easeTo({center: [-100.672,46.2541], zoom: 9.24, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-100.672,46.2541], zoom: 9.24, bearing: 0, pitch: 0});
				break;
				case 'OilSpills':
				beforeMap.easeTo({center: [-103.6,38.72], zoom: 4, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-103.6,38.72], zoom: 4, bearing: 0, pitch: 0});
				break;
				default :
			    beforeMap.easeTo({center: [-100.6363,46.43742], zoom: 12.86, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-100.6363,46.43742], zoom: 12.86, bearing: 0, pitch: 0});
				break;
			}
		}

        /////////////////////////////
        //BASEMAP MENU SWITCHING FUNCTIONALITY
		/////////////////////////////


		//RIGHT MENU
        var rightInputs = document.getElementsByName('rtoggle');
		
        function switchRightLayer(layer) {
            var rightLayerClass = layer.target.className; //*A layer.target.id;
            afterMap.setStyle('mapbox://styles/nittyjee/' + rightLayerClass);
        }

        for (var i = 0; i < rightInputs.length; i++) {
            rightInputs[i].onclick = switchRightLayer;
		}


		//LEFT MENU
		var leftInputs = document.getElementsByName('ltoggle');
		
        function switchLeftLayer(layer) {
            var leftLayerClass = layer.target.className; //*A layer.target.id;
            beforeMap.setStyle('mapbox://styles/nittyjee/' + leftLayerClass);
        }

        for (var i = 0; i < leftInputs.length; i++) {
            leftInputs[i].onclick = switchLeftLayer;
		}







/////////////////////////////
// on Map events
/////////////////////////////



beforeMap.on("load", function () {
	console.log("load");
    
	
		// CLICK AND OPEN POPUP

	
});

afterMap.on("load", function () {
	console.log("load");
	
		// CLICK AND OPEN POPUP

	
});

beforeMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});

afterMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});


//////////////////////////////////////////////
// ===== Layers click event functions ======
//////////////////////////////////////////////
	    


//////////////////////////////////////////////
//TIME LAYER FILTERING. NOT SURE HOW WORKS.
//////////////////////////////////////////////






/////////////////////////////
//LAYER CHANGING
/////////////////////////////

//BASEMAP SWITCHING
beforeMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change before");
    var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)

	//addBeforeLayers();
	addBeforeLayers(yr,date);
});

//BASEMAP SWITCHING
afterMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change after");
	var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	
	//addAfterLayers();
	addAfterLayers(yr,date);
});





