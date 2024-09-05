<?php

$path = "sample.xml";
  
// Read entire file into string
$xmlfile = file_get_contents($path);
  
// Convert xml string into an object
$new = simplexml_load_string($xmlfile);
  
// Convert into json
$con = json_encode($new);
  
// Convert into associative array
$layersArrXML = json_decode($con, true);

$isIndexed = empty($layersArrXML["record"]["name"]);

$layersArr = array();

if($isIndexed)
	$layersArr = $layersArrXML;
else
	$layersArr = array("record" => $layersArrXML);

?>
<!DOCTYPE html>
<html>
 
	<head>

		<!-- SOURCES-->

		<title>Mapping Early New York - New Amsterdam History</title>
		
		<meta name="description" content="New Amsterdam - Early New York Interactive Map with History Timeline">
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="robots" content="all" />

<!--  Essential META Tags -->
<meta property="og:title" content="Mapping Early New York - New Amsterdam History">
<meta property="og:type" content="website" />
<meta property="og:image" content="https://nahc-mapping.org/mappingNY/icons/FortAmsterdam.jpg">
<meta property="og:url" content="https://nahc-mapping.org/mappingNY/">
<meta name="twitter:card" content="new_amsterdam_icon">

<!--  Non-Essential, But Recommended -->
<meta property="og:description" content="New Amsterdam - Early New York Interactive Map with History Timeline">
<meta property="og:site_name" content="New Amsterdam History">
<meta name="twitter:image:alt" content="New Amsterdam Icon">
		
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="theme-color" content="#00A2E5">
    <meta name="apple-mobile-web-app-title" content="Mapping Early New York | New Amsterdam History">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
	

		
		
		<link rel="shortcut icon" href="https://nahc-mapping.org/mappingNY/icons/icon_32x32.ico"  type="image/x-icon" />
        <link rel="icon" href="https://nahc-mapping.org/mappingNY/icons/icon_32x32.ico"  type="image/x-icon" />
		
		<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,600italic' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="https://nahc-mapping.org/mappingNY/timeline/vendor/jquery-ui-1.10.3.custom/css/ui-darkness/jquery-ui-1.10.3.custom.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script src="https://nahc-mapping.org/mappingNY/timeline/vendor/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
		<script src="https://nahc-mapping.org/mappingNY/timeline/vendor/jquery.ui.touch-punch.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js"></script>
		<!--
		<script src='https://api.mapbox.com/mapbox-gl-js/v0.38.0/mapbox-gl.js'></script>
		<link href='https://api.mapbox.com/mapbox-gl-js/v0.38.0/mapbox-gl.css' rel='stylesheet' />
		-->
		<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js'></script>
        <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.1.0/mapbox-gl-compare.js'></script>
		<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css' rel='stylesheet' />
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.1.0/mapbox-gl-compare.css' type='text/css' />
		<link href='https://nahc-mapping.org/mappingNY/timeline/index.css' rel='stylesheet' />

        <!-- Load Awesome Icons 4.7.0 -->
		<!--
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		-->
		<!-- Load Awesome Icons 5.15.3 -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- MODAL INFO JS SOURCE -->


		<!-- TIMELINE FUNCTIONALITY -->

		<script>

    // get Info from REST API
    // time slider
	        var timeline_pointer_flag = true;
	
	        var sliderStartDrag = moment("06/02/1643").unix();
		    var sliderStart = moment("01/01/1626").unix();
		    //var sliderEnd = moment().unix();
			var sliderEndDrag = moment("07/04/1675").unix();
			var sliderEnd = moment("01/01/1700").unix();
				
			//*A (sliderStart + sliderEnd)/2 = -9799671480
			var sliderMiddle =  (sliderStart + sliderEnd)/2;
			var tooltiPos = -100;
			
			var ruler_step = (sliderEnd - sliderStart)/10,
				date_ruler1 = sliderStart + ruler_step,
				date_ruler2 = sliderStart + ruler_step*3,
				date_ruler4 = sliderStart + ruler_step*7,
				date_ruler5 = sliderStart + ruler_step*9;
	
	// simple tooltip
			
			var layer_view_flag = true;
			var windoWidth = 0;
			
			$(document).ready(function () {
				if (jQuery.browser.msie) alert('Sorry, this application uses state of the art HTML5 techniques which are not (well) supported by Internet Explorer.\nUse Google Chrome or Mozilla Firefox to experience the full power of HTML5 and this application');
                
				
				windoWidth = $(window).width();
				//console.log(windoWidth);
				//555
				if(windoWidth <= 637) {
				    if(layer_view_flag) {
						$("#view-hide-layer-panel").css({'margin-left' : "-337px"});
						$("#mobi-hide-sidebar").css({'margin-left' : "-111%"});
						layer_view_flag = false;
						$("#dir-txt").html("&#9205;");
					}
			    }
                
				$(window).resize(function(){
				    windoWidth = $(window).width();
				});
				
				$('#view-hide-layer-panel').click(function() {
				    if(layer_view_flag) {
				        $("#studioMenu").animate({'margin-left' : "-337px"},500);//.slideUp();
						$(this).animate({'margin-left' : "-337px"},500);
						$('#mobi-hide-sidebar').animate({'margin-left' : "-337px"},500);
						layer_view_flag = false;
						$("#dir-txt").html("&#9205;");
						$("#rightInfoBar").slideUp();
					} else {
					    $("#studioMenu").animate({'margin-left' : "0px"},500);//.slideDown();
						$(this).animate({'margin-left' : "0px"},500);
						$('#mobi-hide-sidebar').animate({'margin-left' : "0px"},500);
						layer_view_flag = true;
						$("#dir-txt").html("&#9204;");
						//555
						if(windoWidth > 637)
						    $("#rightInfoBar").slideDown();
					}
				});
				
				$('#mobi-view-sidebar').click(function() {
				    if(!layer_view_flag) {
				        $("#studioMenu").animate({'margin-left' : "0px"},500);//.slideDown();
						$("#view-hide-layer-panel").animate({'margin-left' : "0px"},500);
						$("#mobi-hide-sidebar").animate({'margin-left' : "0px"},500);
						layer_view_flag = true;
						$("#dir-txt").html("&#9204;");
					}
				});
				
				$('#mobi-hide-sidebar').click(function() {
				    if(layer_view_flag) {
				        $("#studioMenu").animate({'margin-left' : "-111%"},500);//.slideUp();
						$("#view-hide-layer-panel").animate({'margin-left' : "-337px"},500);
						$(this).animate({'margin-left' : "-111%"},500);
						layer_view_flag = false;
						$("#dir-txt").html("&#9205;");
					}
				});
				
				
				// console.log(window.name);
				
                // time slider
				$("#ruler-date1").text(moment.unix(date_ruler1).format('YYYY')); // .format('DD MMM YYYY')
				$("#ruler-date2").text(moment.unix(date_ruler2).format('YYYY')); // .format('DD MMM YYYY')
				//$("#ruler-date3").text(moment.unix(sliderMiddle).format('DD MMM YYYY'));
				$("#ruler-date3").html("&nbsp; &#8678; &nbsp; TIME &nbsp; &nbsp; &nbsp; &nbsp; SLIDE &nbsp; &#8680;");
				$("#mobi-year").html("&nbsp; &#8678; &nbsp; TIME &nbsp; &nbsp; &nbsp; &nbsp; SLIDE &nbsp; &#8680;");
				$("#ruler-date4").text(moment.unix(date_ruler4).format('YYYY')); // .format('DD MMM YYYY')
				$("#ruler-date5").text(moment.unix(date_ruler5).format('YYYY')); // .format('DD MMM YYYY')
				
				console.log("start:", sliderStart);
				console.log("end:", sliderEnd);
				console.log("window:", window.name);

				$("#slider").slider({
					min: sliderStart,
					max: sliderEnd,
					step: 86400, //24 hrs in unix time, set slider step to 1 day=86400 seconds
					value: sliderMiddle, //window.name || sliderMiddle,
					slide: function (event, ui) {
						tooltiPos = ((ui.value < sliderMiddle ) ? 30 : -100);
						/*
					        $(ui.handle).find('.ui-slider-tooltip').css({ left: tooltiPos}).text(moment.unix(ui.value).format('MM/DD/YYYY'));
						$("#date").val(moment.unix(ui.value).format('MM/DD/YYYY'));
						*/
						
						//urlHash = window.location.hash + '/' + ui.value;
						// console.log(urlHash);
						// hash.onMapMove();
						if(timeline_pointer_flag) {
						    $("#ruler-date3").text(moment.unix(sliderMiddle).format('YYYY')); // .format('DD MMM YYYY')
					        //$("#mobi-year").text(moment.unix(sliderMiddle).format('YYYY'));  // .format('DD MMM YYYY')
							$("#mobi-year").css("display", "none");
							$("#ruler-date1").css("display", "block");
							$("#ruler-date2").css("display", "block");
							$("#ruler-date3").css("display", "block");
							$("#ruler-date4").css("display", "block");
							$("#ruler-date5").css("display", "block");
						    timeline_pointer_flag = false;
						}
						
						changeDate(ui.value);
						$("#date").text(moment.unix(ui.value).format('DD MMM YYYY'));
						
					},
					create: function( event, ui ) {
				                var tooltip = $('<div class="ui-slider-tooltip" />').css({
					              position: 'absolute',
					              top: 32,
					              left: tooltiPos,
					              color: "red",
					              width: "100px",
					              size: "1"
				                }).text(moment.unix(sliderMiddle).format('MM/DD/YYYY'));

				                      //*A $(event.target).find('.ui-slider-handle').append(tooltip);
			                        },
			                        change: function(event, ui) {}
				});

				//*A $("#date").val($("#slider").slider("values", 0));
                                //*A $("#date").val(moment.unix($("#slider").slider("values", 0)).format('MM/DD/YYYY'));
				$("#date").text(moment.unix($("#slider").slider("values", 0)).format('DD MMM YYYY'));
				
				<?php

				foreach($layersArr["record"] as $a_layer) {
				
				    $mouse_hover_flag = false;
					$circle_hover_flag = false;
					$bg_color = "#FFFFFF";
		            $js_id = str_replace('-', '_', $a_layer["ID"]);
					
		            if($a_layer["type"] == "fill") {
		                if((!empty($a_layer["paint"]["fill-opacity"])) && (!empty($a_layer["paint"]["fill-opacity-hover"]))) {
			                $mouse_hover_flag = true;
							$bg_color = $a_layer["paint"]["fill-color"];
		                }
		            }
					
					if($a_layer["type"] == "circle") {
			            if(!empty($a_layer["circle-hover"])) {
				            if($a_layer["circle-hover"] == "on") {
			                    $circle_hover_flag = true;
								$bg_color = $a_layer["paint"]["circle-color"];
				            }
			            }
		            }
				
				
				    $js_code = ' $("#'.$a_layer["ID"].'").click(function() {';
                    $js_code .= ' if( $( this ).prop("checked") ) {';
					$js_code .= ' beforeMap.setLayoutProperty( "'.$a_layer["id-left"].'", "visibility", "visible" ); afterMap.setLayoutProperty( "'.$a_layer["id-right"].'", "visibility", "visible" ); ';
					if($mouse_hover_flag) {
						$js_code .= ' beforeMap.setLayoutProperty( "'.$a_layer["id-left"].'-highlighted", "visibility", "visible" ); afterMap.setLayoutProperty( "'.$a_layer["id-right"].'-highlighted", "visibility", "visible" ); ';
					}
					$js_code .= ' } else { ';
					$js_code .= ' beforeMap.setLayoutProperty( "'.$a_layer["id-left"].'", "visibility", "none" ); afterMap.setLayoutProperty( "'.$a_layer["id-right"].'", "visibility", "none" ); ';
					if($mouse_hover_flag) {
						
		                $hide_highlighted = $js_id.'_hideHigh';
						
						$js_code .= ' 
						'.$hide_highlighted.'();
						beforeMap.setLayoutProperty( "'.$a_layer["id-left"].'-highlighted", "visibility", "none" ); afterMap.setLayoutProperty( "'.$a_layer["id-right"].'-highlighted", "visibility", "none" ); 
						
						$("div#'.$js_id.'_infoBar").slideUp();
						
						';
						
						
					}
					if($circle_hover_flag) {
						
		                $hide_highlighted = $js_id.'_hideHigh';
						
						$js_code .= ' 
						'.$hide_highlighted.'();
						
						$("div#'.$js_id.'_infoBar").slideUp();
						
						';
						
						
					}
					$js_code .= ' } }); ';
					
					if($mouse_hover_flag || $circle_hover_flag) {
						$js_code .= '
						
						$("div#rightInfoBar").append("<div id=\"'.$js_id.'_infoBar\" style=\"background-color: '.$bg_color.';  width: 270px;\"></div>");
						
						$("div#'.$js_id.'_infoBar").slideUp();
						
						';
					}
			    
				    echo $js_code;
					echo '';
				}
				
				?>

			});
	
	
// --> map init

function changeDate(unixDate) {
	var year = parseInt(moment.unix(unixDate).format("YYYY"));
	var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

	var yrFilter = ["all", ["<=", "YearStart", year], [">=", "YearEnd", year]];
	var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

	///////////////////////////////
	//LAYERS FOR FILTERING
	///////////////////////////////

<?php
    $layerFilter = '';
	
    foreach($layersArr["record"] as $a_layer) {
		
		$mouse_hover_flag = false;
		
		if($a_layer["type"] == "fill") {
		    if((!empty($a_layer["paint"]["fill-opacity"])) && (!empty($a_layer["paint"]["fill-opacity-hover"]))) {
			    $mouse_hover_flag = true;
		    }
		}
		
		
		if($a_layer["filter"] == "date") {
	        $layerFilter .= 'beforeMap.setFilter("'.$a_layer["id-left"].'", dateFilter);
';
            $layerFilter .= 'afterMap.setFilter("'.$a_layer["id-right"].'", dateFilter);

';

            if($mouse_hover_flag) {
			   $layerFilter .= 'beforeMap.setFilter("'.$a_layer["id-left"].'-highlighted", dateFilter);
';
                $layerFilter .= 'afterMap.setFilter("'.$a_layer["id-right"].'-highlighted", dateFilter);

';
            }
		}
		if($a_layer["filter"] == "year") {
	        $layerFilter .= 'beforeMap.setFilter("'.$a_layer["id-left"].'", yrFilter);
';
            $layerFilter .= 'afterMap.setFilter("'.$a_layer["id-right"].'", yrFilter);

';

            if($mouse_hover_flag) {
			   $layerFilter .= 'beforeMap.setFilter("'.$a_layer["id-left"].'-highlighted", yrFilter);
';
                $layerFilter .= 'afterMap.setFilter("'.$a_layer["id-right"].'-highlighted", yrFilter);

';
            }
		}
	}
	
	echo $layerFilter;
	
?>

}//end function changeDate

// --> map init

			
function addBeforeLayers(yr, date) {

console.warn(" === Load Left Side Layers ==== ")


<?php



 foreach($layersArr["record"] as $a_layer) {
		
		$mouse_hover_flag = false;
		$circle_hover_flag = false;
		$bg_color = "#FFFFFF";
		
		if($a_layer["type"] == "fill") {
		    if((!empty($a_layer["paint"]["fill-opacity"])) && (!empty($a_layer["paint"]["fill-opacity-hover"]))) {
			    $mouse_hover_flag = true;
				$bg_color = $a_layer["paint"]["fill-color"];
		    }
		}
		
		if($a_layer["type"] == "circle") {
			if(!empty($a_layer["circle-hover"])) {
				if($a_layer["circle-hover"] == "on") {
			        $circle_hover_flag = true;
					$bg_color = $a_layer["paint"]["circle-color"];
				}
			}
		}
		
		$MapboxLayer = '';
		
		if($mouse_hover_flag) {
			$MapboxLayer .= ' beforeMap.addLayer({ id: "'.$a_layer["id-left"].'-highlighted", type: "'.$a_layer["type"].'",';
		    $MapboxLayer .= ' "source-layer": "'.$a_layer["source-layer"].'",';
            $MapboxLayer .= ' source: { type: "'.$a_layer["source"]["type"].'", url: "'.$a_layer["source"]["url"].'" },';
		    $MapboxLayer .= ' layout: { visibility: "visible" },'; //visibility: document.getElementById('castello_points').checked ? "visible" : "none",
            $MapboxLayer .= ' paint: { ';
			$MapboxLayer .= '"fill-color": "'.$a_layer["paint"]["fill-color"].'", "fill-opacity": [ "case", ["boolean", ["feature-state", "hover"], false], 0.7, 0 ]';
			$MapboxLayer .= ' } ';
			if($a_layer["filter"] == "date") {
		        $MapboxLayer .= ', filter: ["all", ["<=", "DayStart", 16630101], [">=", "DayEnd", 16630101]] ';
		    }
		    $MapboxLayer .=  ' }); ';
		}
		
		
		$MapboxLayer .= ' beforeMap.addLayer({ id: "'.$a_layer["id-left"].'", type: "'.$a_layer["type"].'",';
		$MapboxLayer .= ' "source-layer": "'.$a_layer["source-layer"].'",';
        $MapboxLayer .= ' source: { type: "'.$a_layer["source"]["type"].'", url: "'.$a_layer["source"]["url"].'" },';
		$MapboxLayer .= ' layout: { visibility: "visible" },'; //visibility: document.getElementById('castello_points').checked ? "visible" : "none",
        $MapboxLayer .= ' paint: { ';
		
		
		
		if($mouse_hover_flag) {
		    $MapboxLayer .= '"fill-opacity": [ "case", ["boolean", ["feature-state", "hover"], false], '.$a_layer["paint"]["fill-opacity-hover"].', '.$a_layer["paint"]["fill-opacity"].'],';
		}
		
        foreach($a_layer["paint"] as $paint_param_name => $paint_param_val) {
			if(!empty($paint_param_val)) {
				$param_subname = explode("-", $paint_param_name);
				$param_subname_lastindex = count($param_subname)-1;
				if($param_subname[$param_subname_lastindex] == 'color') {
				    $MapboxLayer .= ' "'.$paint_param_name.'": "'.$paint_param_val.'", ';
			    } else {
					if ((!$mouse_hover_flag) || ($mouse_hover_flag && ($param_subname[1] != "opacity")))
					    $MapboxLayer .= ' "'.$paint_param_name.'": '.$paint_param_val.', ';
				}
		    }
		}
		
        $MapboxLayer .=  ' }';
		if($a_layer["filter"] == "date") {
		    $MapboxLayer .= ', filter: ["all", ["<=", "DayStart", 16630101], [">=", "DayEnd", 16630101]] ';
		}
		$MapboxLayer .=  ' }); ';
		
		
		$hoveredIdLeft = 'hovered_'.str_replace('-', '_', $a_layer["id-left"]);
		$beforePopUp = 'before_'.str_replace('-', '_', $a_layer["id-left"]).'_PopUp';
		$clickHandle = str_replace('-', '_', $a_layer["ID"]).'_clickHandle';
		
		if($mouse_hover_flag || $circle_hover_flag) {
		    $MapboxLayer .= '
			
			var '.$hoveredIdLeft.' = null;
			var '.$beforePopUp.' = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
			
			//CURSOR ON HOVER
            //ON HOVER
			beforeMap.on("mouseenter", "'.$a_layer["id-left"].'", function (e) {
                beforeMap.getCanvas().style.cursor = "pointer";
				'.$beforePopUp.'.setLngLat(e.lngLat).addTo(beforeMap);
			});
			
            beforeMap.on("mousemove", "'.$a_layer["id-left"].'", function (e) {
				if (e.features.length > 0) {
                    if ('.$hoveredIdLeft.') {
                        beforeMap.setFeatureState(
                            { source: "'.$a_layer["id-left"].'", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$hoveredIdLeft.'},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    '.$hoveredIdLeft.' = e.features[0].id;
                    beforeMap.setFeatureState(
                        { source: "'.$a_layer["id-left"].'", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$hoveredIdLeft.'},
                        { hover: true }
                    );
			
		            var popup_text = e.features[0].properties.Name || e.features[0].properties.LOT2;
			        var PopUpHTML = "<div style=\'background-color: '.$bg_color.'; border: 2px solid #f15b28;\'><br> &nbsp; &nbsp; <b>" + popup_text + "</b> &nbsp; &nbsp; <br><br></div>";
			        //BEFORE MAP POP UP CONTENTS
                    '.$beforePopUp.'.setLngLat(e.lngLat).setHTML(PopUpHTML);
				
				}
			
            });
		

            //OFF HOVER
			beforeMap.on("mouseleave", "'.$a_layer["id-left"].'", function () {
                beforeMap.getCanvas().style.cursor = "";
				if ('.$hoveredIdLeft.') {
                    beforeMap.setFeatureState(
                        { source: "'.$a_layer["id-left"].'", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$hoveredIdLeft.'},
                        { hover: false }
                    );
                }
                '.$hoveredIdLeft.' = null;		
				if('.$beforePopUp.'.isOpen()) '.$beforePopUp.'.remove();
            });
			
			
			//ON CLICK
			beforeMap.on("click", "'.$a_layer["id-left"].'", function (e) {
				'.$clickHandle.'(e);
			});
			
			';
		}
		
		echo $MapboxLayer;

	}

?>

}

function addAfterLayers(yr, date) {


<?php



 foreach($layersArr["record"] as $a_layer) {
		
		$mouse_hover_flag = false;
		$circle_hover_flag = false;
		$bg_color = "#FFFFFF";
		
		if($a_layer["type"] == "fill") {
		    if((!empty($a_layer["paint"]["fill-opacity"])) && (!empty($a_layer["paint"]["fill-opacity-hover"]))) {
			    $mouse_hover_flag = true;
				$bg_color = $a_layer["paint"]["fill-color"];
		    }
		}
		
		if($a_layer["type"] == "circle") {
			if(!empty($a_layer["circle-hover"])) {
				if($a_layer["circle-hover"] == "on") {
			        $circle_hover_flag = true;
					$bg_color = $a_layer["paint"]["circle-color"];
				}
			}
		}
		
		$MapboxLayer = '';
		
		if($mouse_hover_flag) {
			$MapboxLayer .= ' afterMap.addLayer({ id: "'.$a_layer["id-right"].'-highlighted", type: "'.$a_layer["type"].'",';
		    $MapboxLayer .= ' "source-layer": "'.$a_layer["source-layer"].'",';
            $MapboxLayer .= ' source: { type: "'.$a_layer["source"]["type"].'", url: "'.$a_layer["source"]["url"].'" },';
		    $MapboxLayer .= ' layout: { visibility: "visible" },'; //visibility: document.getElementById('castello_points').checked ? "visible" : "none",
            $MapboxLayer .= ' paint: { ';
			$MapboxLayer .= '"fill-color": "'.$a_layer["paint"]["fill-color"].'", "fill-opacity": [ "case", ["boolean", ["feature-state", "hover"], false], 0.7, 0 ]';
			$MapboxLayer .= ' } ';
			if($a_layer["filter"] == "date") {
		        $MapboxLayer .= ', filter: ["all", ["<=", "DayStart", 16630101], [">=", "DayEnd", 16630101]] ';
		    }
		    $MapboxLayer .=  ' }); ';
		}
		
		
		$MapboxLayer .= ' afterMap.addLayer({ id: "'.$a_layer["id-right"].'", type: "'.$a_layer["type"].'",';
		$MapboxLayer .= ' "source-layer": "'.$a_layer["source-layer"].'",';
        $MapboxLayer .=  ' source: { type: "'.$a_layer["source"]["type"].'", url: "'.$a_layer["source"]["url"].'" },';
		$MapboxLayer .=  ' layout: { visibility: "visible" },'; //visibility: document.getElementById('castello_points').checked ? "visible" : "none",
        $MapboxLayer .=  ' paint: { ';
		
		if($mouse_hover_flag) {
		    $MapboxLayer .= '"fill-opacity": [ "case", ["boolean", ["feature-state", "hover"], false], '.$a_layer["paint"]["fill-opacity-hover"].', '.$a_layer["paint"]["fill-opacity"].'],';
		}
		
        foreach($a_layer["paint"] as $paint_param_name => $paint_param_val) {
			if(!empty($paint_param_val)) {
				$param_subname = explode("-", $paint_param_name);
				$param_subname_lastindex = count($param_subname)-1;
				if($param_subname[$param_subname_lastindex] == 'color') {
				    $MapboxLayer .= ' "'.$paint_param_name.'": "'.$paint_param_val.'", ';
			    } else {
					if ((!$mouse_hover_flag) || ($mouse_hover_flag && ($param_subname[1] != "opacity")))
					    $MapboxLayer .= ' "'.$paint_param_name.'": '.$paint_param_val.', ';
				}
		    }
		}
		
        $MapboxLayer .=  ' }';
		if($a_layer["filter"] == "date") {
		    $MapboxLayer .= ', filter: ["all", ["<=", "DayStart", 16630101], [">=", "DayEnd", 16630101]] ';
		}
		$MapboxLayer .=  ' }); ';
		
		$hoveredIdRight = 'hovered_'.str_replace('-', '_', $a_layer["id-right"]);
		$afterPopUp = 'before_'.str_replace('-', '_', $a_layer["id-right"]).'_PopUp';
		$clickHandle = str_replace('-', '_', $a_layer["ID"]).'_clickHandle';
		
		if($mouse_hover_flag || $circle_hover_flag) {
		    $MapboxLayer .= '
			
			var '.$hoveredIdRight.' = null;
			var '.$afterPopUp.' = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
			
			//CURSOR ON HOVER
            //ON HOVER
			afterMap.on("mouseenter", "'.$a_layer["id-right"].'", function (e) {
                afterMap.getCanvas().style.cursor = "pointer";
				'.$afterPopUp.'.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on("mousemove", "'.$a_layer["id-right"].'", function (e) {
				if (e.features.length > 0) {
                    if ('.$hoveredIdRight.') {
                        afterMap.setFeatureState(
                            { source: "'.$a_layer["id-right"].'", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$hoveredIdRight.'},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    '.$hoveredIdRight.' = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: "'.$a_layer["id-right"].'", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$hoveredIdRight.'},
                        { hover: true }
                    );
			
		            var popup_text = e.features[0].properties.Name || e.features[0].properties.LOT2;
			        var PopUpHTML = "<div style=\'background-color: '.$bg_color.'; border: 2px solid #f15b28;\'><br> &nbsp; &nbsp; <b>" + popup_text + "</b> &nbsp; &nbsp; <br><br></div>";
			        //BEFORE MAP POP UP CONTENTS
                    '.$afterPopUp.'.setLngLat(e.lngLat).setHTML(PopUpHTML);
				
				}
			
            });
		

            //OFF HOVER
			afterMap.on("mouseleave", "'.$a_layer["id-right"].'", function () {
                afterMap.getCanvas().style.cursor = "";
				if ('.$hoveredIdRight.') {
                    afterMap.setFeatureState(
                        { source: "'.$a_layer["id-right"].'", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$hoveredIdRight.'},
                        { hover: false }
                    );
                }
                '.$hoveredIdRight.' = null;		
				if('.$afterPopUp.'.isOpen()) '.$afterPopUp.'.remove();
            });
			
			
			//ON CLICK
			afterMap.on("click", "'.$a_layer["id-right"].'", function (e) {
				'.$clickHandle.'(e);
			});
			
			';
		}
		
		
		echo $MapboxLayer;

	}

?>

}



<?php

$clickEvents = '';

 foreach($layersArr["record"] as $a_layer) {
		
		$mouse_hover_flag = false;
		$circle_hover_flag = false;
		
		if($a_layer["type"] == "fill") {
		    if((!empty($a_layer["paint"]["fill-opacity"])) && (!empty($a_layer["paint"]["fill-opacity-hover"]))) {
			    $mouse_hover_flag = true;
		    }
		}
		
		if($a_layer["type"] == "circle") {
			if(!empty($a_layer["circle-hover"])) {
				if($a_layer["circle-hover"] == "on") {
			        $circle_hover_flag = true;
				}
			}
		}
		
		$js_id = str_replace('-', '_', $a_layer["ID"]);
		$hide_highlighted = $js_id.'_hideHigh';
		$build_sidebar = $js_id.'_buildSidebar';
		$clickHandle = $js_id.'_clickHandle';
		$clickID = 'clickID_'.$js_id;
		$afterPopUpHigh = 'after_'.str_replace('-', '_', $a_layer["id-right"]).'_PopUpHigh';
		$beforePopUpHigh = 'before_'.str_replace('-', '_', $a_layer["id-left"]).'_PopUpHigh';
		
		if($mouse_hover_flag) {
		    $clickEvents .= '
			
			var '.$clickID.' = null;
			var '.$afterPopUpHigh.' = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
			    '.$beforePopUpHigh.' = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
				
			function '.$clickHandle.'(event) {
				
				if('.$clickID.' !== null) {
				    '.$hide_highlighted.'();
				}
				
				   '.$clickID.' = event.features[0].id;
				   
				    beforeMap.setFeatureState(
                        { source: "'.$a_layer["id-left"].'-highlighted", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$clickID.'},
                        { hover: true }
                    );
				   
                    afterMap.setFeatureState(
                        { source: "'.$a_layer["id-right"].'-highlighted", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$clickID.'},
                        { hover: true }
                    );
			
		
			        var PopUpHTML = "<div style=\'background-color: '.$a_layer["paint"]["fill-color"].'; border: 2px solid #f15b28; \'><br> &nbsp; &nbsp; <b>" + event.features[0].properties.Name + "</b> &nbsp; &nbsp; <br><br></div>";
			        //BEFORE MAP POP UP CONTENTS
                    '.$afterPopUpHigh.'.setLngLat(event.lngLat).setHTML(PopUpHTML).addTo(afterMap);
					'.$beforePopUpHigh.'.setLngLat(event.lngLat).setHTML(PopUpHTML).addTo(beforeMap);
					
					'.$build_sidebar.'(event.features[0].properties);
				
			}
			
			
			function '.$hide_highlighted.'() {
			        beforeMap.setFeatureState(
                        { source: "'.$a_layer["id-left"].'-highlighted", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$clickID.'},
                        { hover: false }
                    );
				   
                    afterMap.setFeatureState(
                        { source: "'.$a_layer["id-right"].'-highlighted", sourceLayer: "'.$a_layer["source-layer"].'", id: '.$clickID.'},
                        { hover: false }
                    );
					
					if('.$afterPopUpHigh.'.isOpen()) '.$afterPopUpHigh.'.remove();
					if('.$beforePopUpHigh.'.isOpen()) '.$beforePopUpHigh.'.remove();
			}
			
			
			function '.$build_sidebar.'(props) {
								
				var popup_html = "<br><h3>'.$a_layer["description"].'</h3><hr><table>";
				
				for (let prop_key in props) {
				    popup_html += "<tr><th style=\"text-align: right;\">" + prop_key + "</th><td>" + props[prop_key] + "</td></tr>";
			    }
				popup_html += "</table>";
				
				
				$("div#'.$js_id.'_infoBar").html(popup_html);
				
				$("div#'.$js_id.'_infoBar").slideDown();
				
			}
			
';
		}
		
		
	    if($circle_hover_flag) {
		    $clickEvents .= '
			
			var '.$afterPopUpHigh.' = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
			    '.$beforePopUpHigh.' = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
				
			function '.$clickHandle.'(event) {
				
				    var PopUpText = event.features[0].properties.Name || event.features[0].properties.LOT2;
			        var PopUpHTML = "<div style=\'background-color: '.$a_layer["paint"]["circle-color"].'; border: 2px solid #f15b28; \'><br> &nbsp; &nbsp; <b>" + PopUpText + "</b> &nbsp; &nbsp; <br><br></div>";
			        //BEFORE MAP POP UP CONTENTS
                    '.$afterPopUpHigh.'.setLngLat(event.lngLat).setHTML(PopUpHTML).addTo(afterMap);
					'.$beforePopUpHigh.'.setLngLat(event.lngLat).setHTML(PopUpHTML).addTo(beforeMap);
					
					'.$build_sidebar.'(event.features[0].properties);
				
			}
			
			
			function '.$hide_highlighted.'() {				
					if('.$afterPopUpHigh.'.isOpen()) '.$afterPopUpHigh.'.remove();
					if('.$beforePopUpHigh.'.isOpen()) '.$beforePopUpHigh.'.remove();
			}
			
			
			function '.$build_sidebar.'(props) {
								
				var popup_html = "<br><h3>'.$a_layer["description"].'</h3><hr><table style=\"width: 100%;\">";
				
				for (let prop_key in props) {
				    popup_html += "<tr><th style=\"text-align: right;\">" + prop_key + "</th><td>" + props[prop_key] + "</td></tr>";
			    }
				popup_html += "</table>";
				
				
				$("div#'.$js_id.'_infoBar").html(popup_html);
				
				$("div#'.$js_id.'_infoBar").slideDown();
				
			}
			
';
		}

 }

echo $clickEvents;

?>

		</script>

		<script type="text/javascript">
			// Google Analytics
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-28801666-1']);
			_gaq.push(['_trackPageview']);

			(function () {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>


		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-159545294-1"></script>
		<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-159545294-1');
		</script>




	</head>

	<body>



		<!-- MAP STYLE-->
		
		<style>
		

				.map {
						position: absolute;
						display:block;
						/*top: 61px;*/
						top:80px;
						/* bottom: 0; */
						bottom: 67px;
						width: 100%;
						/* Standard */
			            /* width: calc(100% - 230px); */
				        /* Opera */
                        /* width: -o-calc(100% - 230px); */
				        /* Firefox */
				        /* width: -moz-calc(100% - 230px); */
				        /* WebKit */
                        /* width: -webkit-calc(100% - 230px); */
						/* right: 0; */
						border-top: 2px solid #b0691d;

                        

					}
			
				body {
					overflow: hidden;
				}
				
				body { margin:0; padding:0; }
	
				body * {
				   -webkit-touch-callout: none;
					 -webkit-user-select: none;
						-moz-user-select: none;
						 -ms-user-select: none;
							 user-select: none;
				}
				
				
				.mapboxgl-ctrl-bottom-left {
                     display: none !important;
                }
				
				.mapboxgl-ctrl-bottom-right {
					bottom: 17px;
					right: 275px;
				}
				
				.mapboxgl-ctrl-group {
				    height: 30px;
				}
				
				/* make from vertical to horizontal */  
				.mapboxgl-ctrl-group > button {
				    display: inline-block;
				}
				
				.mapboxgl-ctrl-group > button + button {
				    border-top: 0; 
                    border-left: 1px solid #ddd;
                }

				
			</style>
			
			
			<!-- HEADER STYLE-->
	
			
			<style>
			
				#header { 
					position:absolute;
					top:0;
					
					bottom: 80px;
					
					width:100%;
					background: #f5f6f7
					url(body.png)
					min-width: 100px;

					text-color: #ffffff;
					text-shadow: #717c9b 0px 1px 3px;
					font-size: 1.40em;

				}
	  
				#link {
					color: #000000c2;
					<!-- Other colors: #e0e0e0 #e6e6dc -->
			
				}
				
			</style>
	
			<!-- HEADER ELEMENTS STYLES-->
			
			<style>
				
				.header a.encyclopedia, .header label#about {
				  float: left;
				  color: black;
				  text-align: center;
				  padding: 10px;
				  text-decoration: none;
				  font-size: 15px; 
				  line-height: 25px;
				  border-radius: 4px;
				  border: solid black;
				  font-weight: bold;
				  margin-top: 3px;
					margin: 3px;
					font-family: "Arial";
				}
	
	            .header i#info { display: none; }
				i.fa-info-circle { color: #777; }
	
				.header a:hover, .header label:hover {
				  background-color: #ddd;
				  color: black;
				}
	
				.header a.active {
				  background-color: dodgerblue;
				  color: white;
				}
	
				.header-right {
				float: right;
				margin-top: 13px;
				margin-left: 50px;
				margin-right: 9px;
				}


				.headerText {
					display: inline-block;
					/*margin-top: 15px;*/
					margin-top: 19px;
					repeat-x 50% 0;
					text-shadow: #717c9b 0px 1px 3px;
					/*font-size: 1.40em;*/
					font-size: 1.7em;
					/*Center*/
					/* margin-left: 10em; */
					/*Left*/
					/*margin-left: 2.2em;*/

					margin-left: 30px;
					font-family: 'Consolas';
                    margin-bottom: 21px;

				}
				

				.header a.encyclopedia {
				background-color: #e8e1da;
				/* color: white; */
				}

				/*Override styling for logo link*/
				.header>a:first-child {
					border: none;
					margin: 0;
					padding: 0;
				}
				.header>a:first-child:hover {
					background-color: inherit;
				}

				</style>


				<!-- EXTERNAL LINK ICON STYLE -->


				<style>
				.img2 {
					vertical-align: text-top;
					padding-left: 2px;
				}
				
				
				button.active {
				  background-color: steelblue;
				  color: white;
				}
				</style>
			
		
		<!-- FOOTER ELEMENTS STYLES-->
			
		<style>
		
			#footer { 
					position:absolute;
					
					bottom: 0px;
					
					width:100%;
					/* height: 35px; */
					height: 67px;
					background: #f5f6f7
					min-width: 100px;

					border-top: 2px solid #b0691d;
					
					font-size: 15px;
                                        padding-left: 10px;
					padding-right: 10px;
				}
			
		</style>
		
    
	<!-- BASEMAP MENU STYLE -->

    <style>
        #baseMapMenu {
            position: absolute;
            background: #b3b3b3;
            padding: 10px 18px 10px 10px;
            font-family: 'Open Sans', sans-serif;
            border-radius: 5px;
            bottom: 175px;
            right: 20px;
        }
		
		div.layer-list-row {
		    width: 100%;
		}
		
		div.layer-list-row:hover {
		    background-color: #DDD;
		}
		
/* tooltip */
.tooltip{
position:absolute;
z-index:999;
left:-9999px;
background-color:#dedede;
padding:3px;
border:1px solid #fff;
width:100px;
text-align: center;
}
.tooltip p{
margin:0;
padding:0;
color:#fff;
background-color:#23579B;
padding:2px 7px;
}

/* hide current buildings fill layers */
	#current_buildings_items,  #current_buildings { display: none; }
	label[for=current_buildings_items], label[for=current_buildings] { display: none; }
		
/* Style for Studio Menu */
/* #demoLayerInfo */

#rightInfoBar {
    position: absolute;
	display:block;
	/* top: 80px; */
	top: 82px;
	right: 0;

	/* Standard */
	max-height: calc(100% - 230px);
	/* Opera */
	max-height: -o-calc(100% - 230px);
	/* Firefox */
	max-height: -moz-calc(100% - 230px);
	/* WebKit */
	max-height: -webkit-calc(100% - 230px);
    overflow: auto;
	/* background-color: transparent !important; */
	background-color: #fff!important;
	z-index: 100;
}

.rightInfoBarBorder {
    border: solid #FFFFFF 3px;
}

#studioMenu {
    position: absolute;
	display:block;
	/* top: 80px; */
	top: 82px;
	                    /* Standard */
			            height: calc(100% - 171px);
				        /* Opera */
                        height: -o-calc(100% - 171px);
				        /* Firefox */
				        height: -moz-calc(100% - 171px);
				        /* WebKit */
                        height: -webkit-calc(100% - 171px);
	/* Standard */
	max-height: calc(100% - 171px);
	/* Opera */
	max-height: -o-calc(100% - 171px);
	/* Firefox */
	max-height: -moz-calc(100% - 171px);
	/* WebKit */
	max-height: -webkit-calc(100% - 171px);
    overflow: auto;
	box-shadow: 0 0 10px 2px rgba(31,51,73,.1)!important;
	background-color: #fff!important;
	padding: 10px 2px 10px 10px;
	/* border-top: 2px solid #b0691d; */
	z-index: 100;
}


/* width */
#studioMenu::-webkit-scrollbar, #rightInfoBar::-webkit-scrollbar {
  width: 7px;
}

/* Track */
#studioMenu::-webkit-scrollbar-track, #rightInfoBar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
#studioMenu::-webkit-scrollbar-thumb, #rightInfoBar::-webkit-scrollbar-thumb {
  background: steelblue; /* #888; */
}

/* Handle on hover */
#studioMenu::-webkit-scrollbar-thumb:hover, #rightInfoBar::-webkit-scrollbar-thumb:hover {
  background: blue; /* #555; */
}

#studioMenu .title {
	color: #23374d;
	font-weight: bold;
	font-size: 17px;
	padding-bottom: 8px;
	text-align: center;
	/* #*A border-bottom: 1px solid #c6d2e1; */
	border-bottom: 1px solid #ce5c00;
	margin-bottom: 8px;
}

#studioMenu { width: 325px; } /* 300px */
#demoLayerInfo, #infoLayerCastello, #infoLayerGrantLots, #infoLayerDutchGrants, #infoLayerGravesend, #infoLayerNativeGroups, #infoLayerKarl, #infoLayerFarms, #infoLayerCurrLots, #infoLayerSettlements { 
    padding: 5px;
	margin-top: 1px;
	margin-bottom: 1px;
    width: 270px; /* left: 258px; width: 300px; */ 
  /* dont break out a link */
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  /* word-break: break-all; */
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

button#zoom-world, button.zoom-labels { padding: 5px 0 5px 0; cursor: pointer; }
button#zoom-world > i, button.zoom-labels > i  { color: #555; }
button#hide-zoom-label {display: none;}

#demoLayerInfo, .demoLayerInfoPopUp { 
    background-color: rgb(50, 205, 50, 0.3); /* #32CD32 LimeGreen */
    border: solid #32CD32 2px;
} 
#infoLayerCastello, .infoLayerCastelloPopUp { 
    background-color: rgb(255, 192, 203, 0.3);  /* #FFC0CB Pink */
    border: solid pink 2px;
} 
#infoLayerSettlements, .infoLayerSettlementsPopUp { 
    background-color: rgb(11, 14, 229, 0.2);  /* #0b0ee5 */
    border: solid #0b0ee5 2px;
} 
#infoLayerGrantLots, .infoLayerGrantLotsPopUp { 
    background-color: rgb(102, 205, 170, 0.3); /* #66CDAA MediumAquamarine */
    border: solid #66CDAA 2px;
}
#infoLayerDutchGrants, .infoLayerDutchGrantsPopUp { 
    background-color: rgb(255, 255, 0, 0.5); /* #FFFF00 Yellow */
    border: solid #FFFF00 2px;
}

/* REPLACE THIS */
#infoLayerGravesend, .infoLayerGravesendPopUp { 
    background-color: rgb(255, 255, 0, 0.5); /* #FFFF00 Yellow */
    border: solid #FFFF00 2px;
}
/* REPLACE THIS */

#infoLayerNativeGroups, .infoLayerNativeGroupsPopUp { 
    background-color: rgb(255, 192, 203, 0.3);  /* #FFC0CB Pink */
    border: solid pink 2px;
}

#infoLayerKarl, .infoLayerKarlPopUp { 
    background-color: rgb(255, 255, 0, 0.5); /* #FFFF00 Yellow */
    border: solid #FFFF00 2px;
}

#infoLayerFarms, .infoLayerFarmsPopUp { 
    /* background-color: rgb(255, 192, 203, 0.5); */
	/* #FFC0CB Pink */
    /* border: solid #FFC0CB 2px; */
	background-color: rgb(255, 255, 0, 0.5); /* #FFFF00 Yellow */
    border: solid #FFFF00 2px;
}
#infoLayerCurrLots, .infoLayerCurrLotsPopUp { 
    background-color: rgb(123, 104, 238, 0.3); /* #7B68EE MediumSlateBlue */
    border: solid #7B68EE 2px;
}

i.compress-expand-icon { cursor: pointer; color: #555; }
i.zoom-to-layer { color: #1d43de; }
i.layer-info, i.zoom-to-layer { cursor: pointer; }  /* float: right; margin-top: 2px; margin-right: 5px; */
i.layer-info:hover, i.zoom-to-layer:hover, i.compress-expand-icon:hover { opacity: 0.7; }

div.dummy-label-layer-space { width: 37px; display: inline-block; }
div.layer-buttons-list { width: 100%; display: flex; flex-direction: row; justify-content: space-between; }
div.layer-buttons-block { width: 38px; right: 3px; margin-right: 3px; position: absolute; display: inline-block; }

/*
.demoLayerInfoPopUp { 
    height: 34px;
    width: 34px;
    background-color: green;
	border-radius: 50%;
	margin: 0 auto;
} 
.infoLayerCastelloPopUp { 
    height: 15px;
    width: 15px;
    background-color: red;
	border-radius: 50%;
	margin: 0 auto;
} 
.infoLayerGrantLotsPopUp { 
    height: 13px;
    width: 100%;
    background-color: #66CDAA;
}
.infoLayerDutchGrantsPopUp { 
    height: 15px;
    width: 100%;
    background-color: #FFFF00;
}
*/

.demoLayerInfoPopUp, .infoLayerCastelloPopUp, .infoLayerGrantLotsPopUp, .infoLayerDutchGrantsPopUp, .infoLayerDutchGrantsPopUp, .infoLayerFarmsPopUp, .infoLayerCurrLotsPopUp, .infoLayerSettlementsPopUp {
    padding-left: 5px;
	padding-right: 5px;
}

#view-hide-layer-panel {
    position: absolute; 
	/*
	bottom: 135px; 
	left: -3px; 
	float: rigth; 
	*/
	top: 88px;
	left: 337px; /* 300 <-> 312px | 325 <-> 312 + 25 */
	z-index: 500; 
	cursor: pointer;
	border: solid sliver;
}


/* hide mapbox gl js close button icon  */
/*
.mapboxgl-popup-close-button { display: none; }
*/

i#mobi-hide-sidebar { 
    color: blue;
	position: absolute;
    margin-top: -11px;	
}

i#mobi-hide-sidebar:hover { 
    color: darkblue;
}

div#mobi-view-sidebar { 
    color: #000;
	position: absolute;
    float: right;
    bottom: 128px;
    right: 20px;
	height: 50px;
    width: 50px;
	text-align: center;
    background-color: #fff;
    border-radius: 50%;
	border: 2px solid #000;
}

div#mobi-view-sidebar:hover { 
    background-color: #ccc;
}

div#mobi-view-sidebar>i {
   margin-top: 9px;
}


/* adaptive | responsive  design */
div#mobi-year {
    display: none;
	width: 100%;
	text-align: center;
}
   
img#logo-img-wide {   
    padding: 6px 0px 0px 21px; 
    float: left;
	height: 70px;
}

img#logo-img {   
    padding: 5px 0px 0px 8px; 
    float: left;
	display: none;
}

@media (max-width: 1000px) {
    span#ruler-date1, span#ruler-date2, span#ruler-date3, span#ruler-date4, span#ruler-date5 {
	    display: none;
	}
	
    div#mobi-year {
	    margin-top: 5px;
	    margin-bottom: -5px;
        display: block;
	}
}

@media (max-width: 930px) {
    .mapboxgl-ctrl-bottom-right {
	    bottom: 7px;
	    right: 170px;
	}
}

/*438*/
@media (max-width: 503px) {
    .header a.encyclopedia, .header label#about { display: none; }
	.header i#info { display: inline-block; }
}

/*555*/
@media (max-width: 657px) {
    #studioMenu { width: 100%; }
	#view-hide-layer-panel { display: none; }
	#rightInfoBar { display: none; }
	/* i.layer-info { margin-right: 21px;} */
	div.layer-buttons-block { width: 111px; }
	div.dummy-label-layer-space { width: 100px; }
	div.layer-buttons-list { justify-content: space-around; }
	
	/*
	img.img2 { display: none; }
	
	img#logo-img-wide {  
		display: none;
	}
	
	img#logo-img {  
	    height: 34px;
		display: inline-block;
	}
	*/
	
	#headerTextSuffix, .headerText { display: none; }
	
}


/*555*/
@media (min-width: 657px) {
    #mobi-hide-sidebar, #mobi-view-sidebar { display: none; }
}

/*930*/
@media (max-width: 1025px) {
    .map { top: 43px; }
	
	#rightInfoBar { top: 45px; }
	
	#studioMenu { 
	    top: 45px; 
		/* Standard */
			            height: calc(100% - 134px);
				        /* Opera */
                        height: -o-calc(100% - 134px);
				        /* Firefox */
				        height: -moz-calc(100% - 134px);
				        /* WebKit */
                        height: -webkit-calc(100% - 134px);
	/* Standard */
	max-height: calc(100% - 134px);
	/* Opera */
	max-height: -o-calc(100% - 134px);
	/* Firefox */
	max-height: -moz-calc(100% - 134px);
	/* WebKit */
	max-height: -webkit-calc(100% - 134px);
	}
	
    /*
	#headerTextSuffix { display: none; }
	*/
	
	.headerText {
					margin-top: 11px;
					font-size: 13pt;
					margin-left: 10px;
				}
	
	.header-right {
				margin-left: 5px;
				margin-right: 5px;
				}
				
		
	.header a.encyclopedia, .header label#about {
				  color: black;
				  text-align: center;
				  padding: 3px;
				  text-decoration: none;
				  font-size: 13px; 
				  line-height: 15px;
				  border-radius: 3px;
				  border: solid black;
				  font-weight: bold;
				  margin-top: 3px;
					margin: 3px;
				}
		
    img#logo-img-wide {  
		height: 39px;
		padding: 2px 0px 0px 3px; 
	}
	
	.header-right {
	    margin-top: 5px;
	}
	

}
	    
i.slash-icon { font-size: 11px; }

	</style>
	
<!-------------------->
<!---ADD MODAL DIV---->
<!-------------------->
	


		
			<!-------------------->
			<!--ADD HEADER DIV---->
			<!-------------------->
			
			<div class="header">

				<div id="header_text" class="headerText">
					Map Structor Test Result
				</div>
				   

				
			</div>



    <!---------------------->
    <!--ADD LAYERS TOGGLE -->
	<!---------------------->
	
	<button id="view-hide-layer-panel" ><br> <span id="dir-txt" >&#9204;</span> <br><br></button>
	

    <div id="rightInfoBar" class="rightInfoBarBorder"></div>
	
	
    <div id="studioMenu">
	  
	  <i id="mobi-hide-sidebar"  class="fa fa-arrow-circle-left fa-3x"></i>
	  
	
	  
      <p class="title">
        LAYERS
      </p>
	  

      <!-- new layers -->
	  <br>


<?php
	 foreach($layersArr["record"] as $a_layer) {
		$layerColor = "#000";
		$layerDIV = '<div class="layer-list-row" >';
		$layerDIV .= '<input type="checkbox" id="'.$a_layer["ID"].'" name="'.$a_layer["ID"].'" checked>';
		$layerDIV .= '<label for="'.$a_layer["ID"].'"> <i class="';
		switch ($a_layer["type"]) {
			case 'fill':
			$layerDIV .= 'fa fa-square';
			$layerColor = $a_layer["paint"]["fill-color"];
            break;
			case 'line':
			$layerDIV .= 'fas fa-slash slash-icon';
			$layerColor = $a_layer["paint"]["line-color"];
            break;
			case 'circle':
			$layerDIV .= 'fa fa-circle';
			$layerColor = $a_layer["paint"]["circle-color"];
            break;
			default:
			$layerDIV .= 'far fa-square';
			break;
		}
		$layerDIV .= '" style="color: '.$layerColor.';" ></i> '.$a_layer["description"].' <div class="dummy-label-layer-space"></div></label>';
		$layerDIV .= '<div class="layer-buttons-block"><div class="layer-buttons-list">';
		$layerDIV .= '<i  class="fa fa-crosshairs zoom-to-layer" onclick="zoomtobounds(\''.$a_layer["zoom-bounds"].'\')" title="Zoom to Layer" ></i>';
		$layerDIV .= '</div></div></div>';
		echo $layerDIV;
	}
?>
	
	</div>
		
		


      <div>
        <!-- #*A
		<br>
		-->
		<hr>
		<p class="title">
			MAPS
		  </p>
		  <!-- #*A
		  <br>
          -->
		<!--CURRENT SATELLITE -->
		<div class="layer-list-row" >
			<input class='cjooubzup2kx52sqdf9zmmv2j' type='radio' name='ltoggle' value='cjooubzup2kx52sqdf9zmmv2j' checked="checked">
			<input class='cjooubzup2kx52sqdf9zmmv2j' type='radio' name='rtoggle' value='cjooubzup2kx52sqdf9zmmv2j'>
			&nbsp;
			<label for='cjooubzup2kx52sqdf9zmmv2j'>Current Satellite <div class="dummy-label-layer-space"></div></label>
			<div class="layer-buttons-block">
		        <div class="layer-buttons-list">
		            <i  style="width: 16px;"></i>
		            <i  class="fa fa-info-circle layer-info trigger-popup" id="satellite-image"  title="Layer Info" ></i>
		        </div>
		    </div>
			</div>
	
        </div>


		

        


	  </div>

	 
	 
	  
	</div>

		<!-- MAP DIV-->
        <!--
		<div id="map" class="map"></div>
		-->
		<div id='before' class='map'></div>
        <div id='after' class='map'></div>


    

    <!---------------------->
    <!--ADD BASEMAP TOGGLE-->
	<!---------------------->
    <!--
	<div id='baseMapMenu'>

	</div>
	-->


		<!-- BASEMAP SWITCHER DIV -->
        <!--
		<div id="styleSwitcher"></div>
		-->
		<div id="mobi-view-sidebar" ><i  class="fa fa-bars fa-2x"></i></div>

		
        <!-- TIMELINE PANEL DIV -->
		<div id='datepanel'><b><span id="date"></span></b></div>
	
	        
	    <!-------------------->
		<!--ADD FOOTER DIV---->
		<!-------------------->
		<div id="footer">
		
			<!-- TIMELINE slider DIV -->
			<div id="slider">
			 
			    <!-- TIMELINE mobile info -->
			    <div id="mobi-year"> ... </div>
				
			    <!-- TIMELINE ruler DIV -->
			    <div class="timeline">
			        <div class="year"><span id="ruler-date1"> ... </span><span class="timeline-ruler"></span></div>
                    <div class="year"><span id="ruler-date2"> ... </span><span class="timeline-ruler"></span></div>
                    <div class="year"><span id="ruler-date3"> ... </span><span class="timeline-ruler"></span></div>
                    <div class="year"><span id="ruler-date4"> ... </span><span class="timeline-ruler"></span></div>
                    <div class="year"><span id="ruler-date5"> ... </span><span class="timeline-ruler"></span></div>
                </div>
				
		    </div>
			
		</div>
	
	
	
		<!-- MAP.JS SOURCE -->
		<script src="js/mapinit.js"></script>
        

	</body>

</html>



