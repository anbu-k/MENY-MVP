<!DOCTYPE html>
<html>
 
	<head>

		<!-- SOURCES-->

		<title>Map Structor</title>
		
		<meta name="description" content="New Amsterdam - Early New York Interactive Map with History Timeline">
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="robots" content="all" />
        
		<!--
        <link rel="shortcut icon" href="https://nahc-mapping.org/mappingNY/icons/icon_32x32.ico"  type="image/x-icon" />
        <link rel="icon" href="https://nahc-mapping.org/mappingNY/icons/icon_32x32.ico"  type="image/x-icon" />
		-->
		
		<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,600italic' rel='stylesheet' type='text/css'>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js" integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js" integrity="sha512-57oZ/vW8ANMjR/KQ6Be9v/+/h6bq9/l3f0Oc7vn6qMqyhvPd1cvKBRWWpzu0QoneImqr2SkmO4MSqU+RpHom3Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/themes/base/jquery-ui.min.css" integrity="sha512-ELV+xyi8IhEApPS/pSj66+Jiw+sOT1Mqkzlh8ExXihe4zfqbWkxPRi8wptXIO9g73FSlhmquFlUOuMSoXz5IRw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		
		<!-- Load Awesome Icons 5.15.3 -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- MODAL INFO JS SOURCE -->



		<script></script>
		
		<style>
        <!--
		
		i.fa-pen-square { color: seagreen; cursor: pointer;} 
		i.fa-pen-square:hover { color: darkgreen; } 
		i.fa-pen-square:active { color: lime; }
		
		i.fa-times-circle { color: red; }
		i.fa-times-circle:hover { color: darkorange; }
		i.fa-times-circle:active { color: yellow; }
		
        -->
        </style>		
		
	</head>

	<body>
	
	
	<div id="add-layer-dialog" title="Add Layer">
	<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" id="add-form">
	   <table border = "1" cellspacing="0" cellpadding="5" >
	   <tr>
       <th>Name:</th>
	   <td><input type="text" name="layer-name" size="35"></td>
	   </tr>
	   <tr>
       <th>Description:</th>
	   <td><input type="text" name="layer-descr" size="35" required pattern="^[\d\D]{5,}$"></td>
	   </tr>
	   <tr>
	   <th>ID:</th>
	   <td><input type="text" name="layer-id" size="35" required pattern="^[0-9a-zA-Z\-\_]{3,}$" ></td>
	   </tr>
	   <!--
	   <tr>
	   <th>ID Left:</th>
	   <td><input type="text" size="35" required pattern="^[0-9a-zA-Z\-\_]{3,}$" ></td>
	   </tr>
	   <tr>
	   <th>ID Right:</th>
	   <td><input type="text" size="35" required pattern="^[0-9a-zA-Z\-\_]{3,}$"  ></td>
	   </tr>
	   -->
	   <tr>
	   <th >Zoom Bounds:</th>
	   <td>
	        <select name="zoom-bounds" required>
            <option selected value="" > - select - </option>
			<option>NewAmsterdam</option>
            <option>NYC</option>
			<option>Brooklyn</option>
			<option>Manhattan</option>
			<option>LongIsland</option>
			<option>NewNL</option>
			<option>NewEngland</option>
            </select>
	   </td>
	   </tr>
	   <tr>
	   <th colspan="2" >Source</th>
	   </tr>
	   <tr>
	   <th>Layer:</th>
	   <td><input type="text" name="source-layer" size="35" required pattern="^[0-9a-zA-Z\-\_]{5,}$" ></td>
	   </tr>
	   <tr>
	   <th>URL:</th>
	   <td><input type="text" name="source-url" size="35" placeholder="mapbox://nittyjee.XXXXXX" required pattern="^mapbox:\/\/nittyjee\.[0-9a-zA-Z]{5,}$" ></td>
	   </tr>
	   <tr>
	   <th>Type:</th>
	   <td>vector</td>
	   </tr>
	   <tr>
	   <th colspan="2" >Shape</th>
	   </tr>
	   <tr>
	   <th >Type:</th>
	   <td>
	        <select name="shape-type" id="shape-type">
			<option selected >line</option>
            <option>fill</option>
			<option>circle</option>
            </select>
	   </td>
	   </tr>
	   <tr>
	   <th >Filter:</th>
	   <td>
	        <select name="filter-type" id="filter-type" >
            <option selected >none</option>
			<option>date</option>
            </select>
	   </td>
	   </tr>
	   <tr>
	   <th colspan="2" >Paint</th>
	   </tr>
	   <tr>
	   <td colspan="2" >
	   
        <table id="line-params">
		<tr><th>line-color:</th><td><input type="text" name="line-color" size="21" pattern="^[\d\D]{3,}$" ></td></tr>
		<tr><th>line-width:</th><td><input type="text" name="line-width" size="3"></td></tr>
		<tr><th>line-opacity:</th><td><input type="text" name="line-opacity" size="3"></td></tr>
		</table>
		
		<table id="fill-params">
		<tr>
		<th >Enable Mouse Over:</th>
	    <td>
        <input type="checkbox" name="fill-mouse-over" id="fill-mouse-over">
	    </td>
	    </tr>
		<tr><th>fill-color:</th><td><input type="text" name="fill-color" size="21" pattern="^[\d\D]{3,}$" ></td></tr>
		<tr><th>fill-opacity:</th><td>
		<!--
		<input type="text" name="fill-opacity" size="3">
		-->
		<div id="fill-opacity-info" style="width: 55px; display: inline-block">0.5</div>
		<input type="range" name="fill-opacity" min="0" max="1" step="0.1" value="0.5" id="fill-opacity" />
		</td></tr>
		<tr><th>fill-opacity-hover:</th><td>
		<div id="fill-opacity-hover-info" style="width: 55px; display: inline-block">0.8</div>
		<input type="range" name="fill-opacity-hover" min="0" max="1" step="0.1" value="0.8" id="fill-opacity-hover" />
		</td></tr>
		<tr><th>fill-outline-color:</th><td><input type="text" name="fill-outline-color" size="21" ></td></tr>
		</table>
		
		<table id="circle-params">
		<tr>
		<th >Enable Mouse Over:</th>
	    <td>
        <input type="checkbox" name="circle-mouse-over" id="circle-mouse-over">
	    </td>
	    </tr>
		<tr><th>circle-color:</th><td><input type="text" name="circle-color" size="21" pattern="^[\d\D]{3,}$" ></td></tr>
		<tr><th>circle-opacity:</th><td><input type="text" name="circle-opacity" size="3"></td></tr>
		<tr><th>circle-radius:</th><td><input type="text" name="circle-radius" size="3"></td></tr>
		<tr><th>circle-stroke-width:</th><td><input type="text" name="circle-stroke-width" size="3"></td></tr>
		<tr><th>circle-stroke-color:</th><td><input type="text" name="circle-stroke-color" size="21" ></td></tr>
		<tr><th>circle-stroke-opacity:</th><td><input type="text" name="circle-stroke-opacity" size="3"></td></tr>
	    </table>
		<!--
		<tr><th></th><td></td></tr>
		-->
		
	   
	   </td>
	   </tr>
	   </table>
	   
	   <input type="hidden" name="action-type" value="add">
	   <input type="hidden" name="action-node-num" value="">
	   
	   <br>
	   &nbsp; &nbsp; &nbsp; 
	   <button type="submit" class="ui-button ui-widget ui-corner-all" id="add-layer" ><span id="form-submit-btn-name">Add</span></button>
	   <br>
	   
	</form>
    </div>
	
<?php




$path = "sample.xml";


// Read entire file into string
$xmlfile = file_get_contents($path);

//echo "<br><br><br>".$xmlfile."<br><br><br>";
  
// Convert xml string into an object
$xml = simplexml_load_string($xmlfile) or die(" - Error: Cannot load XML - ");

//$xml = simplexml_load_file($path);

//echo "<br><br><br>".$xml->record[0]->ID."<br><br><br>";

if (!empty($_REQUEST['action-type'])) {
	if($_POST['action-type'] == "add") {
		/*
		$_POST['layer-name']
		$_POST['layer-descr']
		$_POST['layer-id']
		$_POST['zoom-bounds']
		$_POST['source-layer']
		$_POST['source-url']
		$_POST['shape-type']
		$_POST['line-color']
		$_POST['line-width']
		$_POST['line-opacity']
		*/
		//echo "Shape : ".$_POST['shape-type']."<br><br>";
		$shape_type = $_POST['shape-type'];
		/*
		switch ($shape_type) {
			case 'fill':
			
            break;
			case 'line':
			
            break;
			case 'circle':
			
            break;
		}
		*/
		$xml_record = $xml->addChild("record");
		$xml_record->addChild("name", $_POST['layer-name']);
		$xml_record->addChild("description", $_POST['layer-descr']);
		$xml_record->addChild("ID", $_POST['layer-id']);
		$xml_record->addChild("id-left", $_POST['layer-id']."-left");
		$xml_record->addChild("id-right", $_POST['layer-id']."-right");
		$xml_record->addChild("zoom-bounds", $_POST['zoom-bounds']);
		
		$xml_record_source = $xml_record->addChild("source");
		$xml_record_source->addChild("url", $_POST['source-url']);
		$xml_record_source->addChild("type", "vector");
		
		$xml_record->addChild("source-layer", $_POST['source-layer']);
		$xml_record->addChild("type", $shape_type);
		$xml_record->addChild("filter", $_POST['filter-type']);
		
		$xml_record_paint = $xml_record->addChild("paint");
		switch ($shape_type) {
			case 'fill':
		    if (!empty($_POST['fill-color'])) {
				//$xml_record->addChild("color", $_POST['fill-color']);
		        $xml_record_paint->addChild("fill-color", $_POST['fill-color']);
			}
		    if (!empty($_POST['fill-opacity']))
		        $xml_record_paint->addChild("fill-opacity", $_POST['fill-opacity']);
			if(!empty($_POST['fill-mouse-over'])) {
				//echo "<br><br>Mouse Over Flag: ".$_POST['fill-mouse-over']."<br><br>";
				if($_POST['fill-mouse-over'] == "on"){
			        if (!empty($_POST['fill-opacity-hover']))
		                $xml_record_paint->addChild("fill-opacity-hover", $_POST['fill-opacity-hover']);
				}
			}
			
		    if (!empty($_POST['fill-outline-color']))
		        $xml_record_paint->addChild("fill-outline-color", $_POST['fill-outline-color']);
		    break;
			case 'line':
			if (!empty($_POST['line-color'])) {
				//$xml_record->addChild("color", $_POST['line-color']);
		        $xml_record_paint->addChild("line-color", $_POST['line-color']);
			}
		    if (!empty($_POST['line-width']))
		        $xml_record_paint->addChild("line-width", $_POST['line-width']);
		    if (!empty($_POST['line-opacity']))
		        $xml_record_paint->addChild("line-opacity", $_POST['line-opacity']);
            break;
			case 'circle':
			if(!empty($_POST['circle-mouse-over'])) {
			    $xml_record->addChild("circle-hover", $_POST['circle-mouse-over']);
			}
			if (!empty($_POST['circle-color'])) {
				//$xml_record->addChild("color", $_POST['circle-color']);
		        $xml_record_paint->addChild("circle-color", $_POST['circle-color']);
			}
		    if (!empty($_POST['circle-opacity']))
		        $xml_record_paint->addChild("circle-opacity", $_POST['circle-opacity']);
		    if (!empty($_POST['circle-radius']))
		        $xml_record_paint->addChild("circle-radius", $_POST['circle-radius']);
			if (!empty($_POST['circle-stroke-color']))
		        $xml_record_paint->addChild("circle-stroke-color", $_POST['circle-stroke-color']);
		    if (!empty($_POST['circle-stroke-width']))
		        $xml_record_paint->addChild("circle-stroke-width", $_POST['circle-stroke-width']);
		    if (!empty($_POST['circle-stroke-opacity']))
		        $xml_record_paint->addChild("circle-stroke-opacity", $_POST['circle-stroke-opacity']);
            break;
		}
		
		$xml->asXML($path);
	}
	
	
	if($_POST['action-type'] == "edit") {
		//if(!empty($_POST['action-node-num'])) {
			
			$shape_type = $_POST['shape-type'];
			
		    $act_node_num = intval($_POST['action-node-num']);
			$xml_record = $xml->record[$act_node_num];
			
			    unset($xml_record->name);
				unset($xml_record->description);
				unset($xml_record->ID);
				unset($xml_record->{"id-left"});
				unset($xml_record->{"id-right"});
				unset($xml_record->paint);
				unset($xml_record->source);
                unset($xml_record->{"source-layer"});
				unset($xml_record->{"zoom-bounds"});
				unset($xml_record->filter);
				unset($xml_record->type);
				
		$xml_record->addChild("name", $_POST['layer-name']);
		$xml_record->addChild("description", $_POST['layer-descr']);
		$xml_record->addChild("ID", $_POST['layer-id']);
		$xml_record->addChild("id-left", $_POST['layer-id']."-left");
		$xml_record->addChild("id-right", $_POST['layer-id']."-right");
		$xml_record->addChild("zoom-bounds", $_POST['zoom-bounds']);
		
		$xml_record_source = $xml_record->addChild("source");
		$xml_record_source->addChild("url", $_POST['source-url']);
		$xml_record_source->addChild("type", "vector");
		
		$xml_record->addChild("source-layer", $_POST['source-layer']);
		$xml_record->addChild("type", $shape_type);
		$xml_record->addChild("filter", $_POST['filter-type']);
		
		$xml_record_paint = $xml_record->addChild("paint");
		switch ($shape_type) {
			case 'fill':
		    if (!empty($_POST['fill-color'])) {
				//$xml_record->addChild("color", $_POST['fill-color']);
		        $xml_record_paint->addChild("fill-color", $_POST['fill-color']);
			}
		    if (!empty($_POST['fill-opacity']))
		        $xml_record_paint->addChild("fill-opacity", $_POST['fill-opacity']);
			if(!empty($_POST['fill-mouse-over'])) {
				//echo "<br><br>Mouse Over Flag: ".$_POST['fill-mouse-over']."<br><br>";
				if($_POST['fill-mouse-over'] == "on"){
			        if (!empty($_POST['fill-opacity-hover']))
		                $xml_record_paint->addChild("fill-opacity-hover", $_POST['fill-opacity-hover']);
				}
			}
			
		    if (!empty($_POST['fill-outline-color']))
		        $xml_record_paint->addChild("fill-outline-color", $_POST['fill-outline-color']);
		    break;
			case 'line':
			if (!empty($_POST['line-color'])) {
				//$xml_record->addChild("color", $_POST['line-color']);
		        $xml_record_paint->addChild("line-color", $_POST['line-color']);
			}
		    if (!empty($_POST['line-width']))
		        $xml_record_paint->addChild("line-width", $_POST['line-width']);
		    if (!empty($_POST['line-opacity']))
		        $xml_record_paint->addChild("line-opacity", $_POST['line-opacity']);
            break;
			case 'circle':
			unset($xml_record->{"circle-hover"});
			if(!empty($_POST['circle-mouse-over'])) {
			    $xml_record->addChild("circle-hover", $_POST['circle-mouse-over']);
			}
			if (!empty($_POST['circle-color'])) {
				//$xml_record->addChild("color", $_POST['circle-color']);
		        $xml_record_paint->addChild("circle-color", $_POST['circle-color']);
			}
		    if (!empty($_POST['circle-opacity']))
		        $xml_record_paint->addChild("circle-opacity", $_POST['circle-opacity']);
		    if (!empty($_POST['circle-radius']))
		        $xml_record_paint->addChild("circle-radius", $_POST['circle-radius']);
			if (!empty($_POST['circle-stroke-color']))
		        $xml_record_paint->addChild("circle-stroke-color", $_POST['circle-stroke-color']);
		    if (!empty($_POST['circle-stroke-width']))
		        $xml_record_paint->addChild("circle-stroke-width", $_POST['circle-stroke-width']);
		    if (!empty($_POST['circle-stroke-opacity']))
		        $xml_record_paint->addChild("circle-stroke-opacity", $_POST['circle-stroke-opacity']);
            break;
		}
		
		$xml->asXML($path);
				
	    //}
    }

    if(($_REQUEST['action-type'] == "delete") || ($_REQUEST['action-type'] == "moveup") || ($_REQUEST['action-type'] == "movedown")) {
	    //if(!empty($_REQUEST['act-rec-num'])) {
		    $act_node_num = intval($_REQUEST['act-rec-num']);
			
			if($_REQUEST['action-type'] == "delete") {
                unset($xml->record[$act_node_num]); 
			}
		    
			
			$rec_to_move;
			
			if(($_REQUEST['action-type'] == "moveup") || ($_REQUEST['action-type'] == "movedown")) {
				
				$rec_to_move = json_decode(json_encode($xml->record[$act_node_num]),true);
				
				unset($xml->record[$act_node_num]->name);
				unset($xml->record[$act_node_num]->description);
				unset($xml->record[$act_node_num]->ID);
				unset($xml->record[$act_node_num]->{"id-left"});
				unset($xml->record[$act_node_num]->{"id-right"});
				unset($xml->record[$act_node_num]->paint);
				unset($xml->record[$act_node_num]->source);
                unset($xml->record[$act_node_num]->{"source-layer"});
				unset($xml->record[$act_node_num]->{"zoom-bounds"});
				unset($xml->record[$act_node_num]->filter);
				unset($xml->record[$act_node_num]->type);
				unset($xml->record[$act_node_num]->{"circle-hover"});
				/*
				foreach($xml->record[$act_node_num]->children() as $child) {
				    echo "<br>".$child->getName()."<br>";
			    }
				*/
			}
			
			
			if($_REQUEST['action-type'] == "moveup") {
				$rec_to_up = json_decode(json_encode($xml->record[$act_node_num-1]),true);
				
				unset($xml->record[$act_node_num-1]->name);
				unset($xml->record[$act_node_num-1]->description);
				unset($xml->record[$act_node_num-1]->ID);
				unset($xml->record[$act_node_num-1]->{"id-left"});
				unset($xml->record[$act_node_num-1]->{"id-right"});
				unset($xml->record[$act_node_num-1]->paint);
				unset($xml->record[$act_node_num-1]->source);
                unset($xml->record[$act_node_num-1]->{"source-layer"});
				unset($xml->record[$act_node_num-1]->{"zoom-bounds"});
				unset($xml->record[$act_node_num-1]->filter);
				unset($xml->record[$act_node_num-1]->type);
				unset($xml->record[$act_node_num-1]->{"circle-hover"});
				
				foreach($rec_to_move as $rec_to_move_name => $rec_to_move_val) {
					//echo "<br>".$rec_to_move_name." : ".$rec_to_move_val."<br>";
				
					if(is_array($rec_to_move_val)) {
						$xml->record[$act_node_num-1]->addChild($rec_to_move_name);
	                    //for ($ind = 0; $ind < count($rec_to_move_val); $ind+=1)
						foreach($rec_to_move_val as $rec_to_move_name2 => $rec_to_move_val2) {	
		                    $xml->record[$act_node_num-1]->{$rec_to_move_name}->addChild($rec_to_move_name2, $rec_to_move_val2);
	                    }
					
					} else {
				    
						$xml->record[$act_node_num-1]->addChild($rec_to_move_name, $rec_to_move_val);
					}
					
                }
				
				foreach($rec_to_up as $rec_to_up_name => $rec_to_up_val) {
					//echo "<br>".$rec_to_up_name." : ".$rec_to_up_val."<br>";
				
					if(is_array($rec_to_up_val)) {
						$xml->record[$act_node_num]->addChild($rec_to_up_name);
	                    //for ($ind = 0; $ind < count($rec_to_up_val); $ind+=1)
						foreach($rec_to_up_val as $rec_to_up_name2 => $rec_to_up_val2) {	
		                    $xml->record[$act_node_num]->{$rec_to_up_name}->addChild($rec_to_up_name2, $rec_to_up_val2);
	                    }
					
					} else {
				    
						$xml->record[$act_node_num]->addChild($rec_to_up_name, $rec_to_up_val);
					}
					
                }
			
			}
			
			if($_REQUEST['action-type'] == "movedown") {
				$rec_to_down = json_decode(json_encode($xml->record[$act_node_num+1]),true);
				
				//echo "<br><br>".$act_node_num."<br><br>";
				
				unset($xml->record[$act_node_num+1]->name);
				unset($xml->record[$act_node_num+1]->description);
				unset($xml->record[$act_node_num+1]->ID);
				unset($xml->record[$act_node_num+1]->{"id-left"});
				unset($xml->record[$act_node_num+1]->{"id-right"});
				unset($xml->record[$act_node_num+1]->paint);
				unset($xml->record[$act_node_num+1]->source);
                unset($xml->record[$act_node_num+1]->{"source-layer"});
				unset($xml->record[$act_node_num+1]->{"zoom-bounds"});
				unset($xml->record[$act_node_num+1]->filter);
				unset($xml->record[$act_node_num+1]->type);
				unset($xml->record[$act_node_num+1]->{"circle-hover"});
				
				
				foreach($rec_to_down as $rec_to_down_name => $rec_to_down_val) {
					//echo "<br>".$rec_to_down_name." : ".$rec_to_down_val."<br>";
				
					if(is_array($rec_to_down_val)) {
						$xml->record[$act_node_num]->addChild($rec_to_down_name);
	                    //for ($ind = 0; $ind < count($rec_to_down_val); $ind+=1)
						foreach($rec_to_down_val as $rec_to_down_name2 => $rec_to_down_val2) {	
		                    $xml->record[$act_node_num]->{$rec_to_down_name}->addChild($rec_to_down_name2, $rec_to_down_val2);
	                    }
					
					} else {
				    
						$xml->record[$act_node_num]->addChild($rec_to_down_name, $rec_to_down_val);
					}
					
                }
				
				foreach($rec_to_move as $rec_to_move_name => $rec_to_move_val) {
					//echo "<br>".$rec_to_move_name." : ".$rec_to_move_val."<br>";
				
					if(is_array($rec_to_move_val)) {
						$xml->record[$act_node_num+1]->addChild($rec_to_move_name);
	                    //for ($ind = 0; $ind < count($rec_to_move_val); $ind+=1)
						foreach($rec_to_move_val as $rec_to_move_name2 => $rec_to_move_val2) {	
		                    $xml->record[$act_node_num+1]->{$rec_to_move_name}->addChild($rec_to_move_name2, $rec_to_move_val2);
	                    }
					
					} else {
				    
						$xml->record[$act_node_num+1]->addChild($rec_to_move_name, $rec_to_move_val);
					}
					
                }
				
				
			}
			
            $xml->asXML($path);
	    //}
	}
	
}
// Convert into json
$convJSON = json_encode($xml);
  
// Convert into associative array
$layersLst = json_decode($convJSON, true);
  
//print_r($layersLst);


echo "<br>";
$tableHTML = "<table border = '1' cellspacing='0' cellpadding='5' ><thead><tr><th> № </th><th> Name </th><th> Description </th><th> ID </th><th> Source </th><th> Bounds </th><th> Type </th><th> Paint </th><th> Edit </th><th> Up </th><th> Down </th><th> Delete </th></tr></thead><tbody>";
$rowNum = 0;

//echo "<br><br>".count($layersLst["record"]);

$isIndexed = empty($layersLst["record"]["name"]);

if($isIndexed) {
    foreach($layersLst["record"] as $a_layer) {
		
		$rowNum = $rowNum + 1;
		$tableHTML .= "<tr><th> ".$rowNum.". </th><td> ".(is_array($a_layer["name"]) ? "" : $a_layer["name"])." </td><td> ".$a_layer["description"]." </td>";
		$tableHTML .= "<td> ".$a_layer["ID"]." <br> ".$a_layer["id-left"]." <br> ".$a_layer["id-right"]." </td>";
		$tableHTML .= "<td> ".$a_layer["source"]["url"]." <br> ".$a_layer["source-layer"]." <br> ".$a_layer["source"]["type"]." </td>";
		$tableHTML .= "<td> ".$a_layer["zoom-bounds"]." </td><td> ".$a_layer["type"]." <br><br> filter: <br> ".$a_layer["filter"]." </td><td>";
		
		foreach($a_layer["paint"] as $paint_param_name => $paint_param_val) {
			if(!empty($paint_param_val)) {
				$tableHTML .= " ".$paint_param_name.": ".$paint_param_val." <br>";
		    }
		}
		
		$tableHTML .= "</td><td><i class='fa fa-pen-square fa-3x' onclick='editRecord(".($rowNum - 1).")'></i></td>";
		if($rowNum > 1)
		    $tableHTML .= "<td><a href=struct.php?action-type=moveup&act-rec-num=".($rowNum - 1)."><i class='fa fa-arrow-circle-up fa-3x'></i></a></td>";
		else
			$tableHTML .= "<td></td>";
		if($rowNum < count($layersLst["record"]))
		    $tableHTML .= "<td><a href=struct.php?action-type=movedown&act-rec-num=".($rowNum - 1)."><i class='fa fa-arrow-circle-down fa-3x'></i></a></td>";
		else
			$tableHTML .= "<td></td>";
		$tableHTML .= "<td><a onclick=\"return confirm('Would you like to really delete a layer ID: ".$a_layer["ID"]." ?');\" href=struct.php?action-type=delete&act-rec-num=".($rowNum - 1)."><i class='fa fa-times-circle fa-3x'></i></a></td></tr>";
	}
} else {
	    $rowNum = 1;
		$tableHTML .= "<tr><th> ".$rowNum.". </th><td> ".(is_array($layersLst["record"]["name"]) ? "" : $layersLst["record"]["name"])." </td><td> ".$layersLst["record"]["description"]." </td>";
		$tableHTML .= "<td> ".$layersLst["record"]["ID"]." <br> ".$layersLst["record"]["id-left"]." <br> ".$layersLst["record"]["id-right"]." </td>";
		$tableHTML .= "<td> ".$layersLst["record"]["source"]["url"]." <br> ".$layersLst["record"]["source-layer"]." <br> ".$layersLst["record"]["source"]["type"]." </td>";
		$tableHTML .= "<td> ".$layersLst["record"]["zoom-bounds"]." </td><td> ".$layersLst["record"]["type"]." <br><br> filter: <br> ".$layersLst["record"]["filter"]." </td><td>";
		
		foreach($layersLst["record"]["paint"] as $paint_param_name => $paint_param_val) {
			if(!empty($paint_param_val)) {
				$tableHTML .= " ".$paint_param_name.": ".$paint_param_val." <br>";
		    }
		}
		
		$tableHTML .= "</td><td><i class='fa fa-pen-square fa-3x' onclick='editRecord(".($rowNum - 1).")'></i></td>";
        $tableHTML .= "<td></td><td></td>";
		$tableHTML .= "<td><a onclick=\"return confirm('Would you like to really delete a layer ID: ".$layersLst["record"]["ID"]." ?');\" href=struct.php?action-type=delete&act-rec-num=".($rowNum - 1)."><i class='fa fa-times-circle fa-3x'></i></a></td></tr>";
}

$tableHTML .= "</tbody></table>";

echo $tableHTML;
	

?>

    <br><br>
    <button class="ui-button ui-widget ui-corner-all" id="add-layer-btn" ><i class="fas fa-plus-square"></i> &nbsp; Add a new Layer</button>

    <script type="text/javascript" >
	
	var layersList = <?php echo $convJSON; ?>;
	
	    $(document).ready(function () {
			
            $( "#add-layer-dialog" ).dialog( { autoOpen: false, width: 500 } );
	        
			$("#fill-params").css({'display' : "none"});
            $("#line-params").css({'display' : "block"});
		    $("#circle-params").css({'display' : "none"});
			
			$('#add-layer-btn').click(function() {
			   //document.getElementById("add-layer-dialog").title = "Add Layer";
			   //$("div#add-layer-dialog").prop("title", "Add Layer");
			   
			   resetFormFields();
			   
			   $("#fill-params").css({'display' : "none"});
               $("#line-params").css({'display' : "block"});
		       $("#circle-params").css({'display' : "none"});
			   
			   //$( "#add-layer-dialog" ).dialog( { autoOpen: true } );
			   $( "#add-layer-dialog" ).dialog({ title: "Add Layer №<?php echo $rowNum + 1; ?>" }).dialog("open");
			    
	        });
			
			$('select#shape-type').change(function() {
				//console.log($(this).val());
				switch($(this).val()) {
                case 'fill':
				$("#fill-params").css({'display' : "block"});
                $("#line-params").css({'display' : "none"});
				$("#circle-params").css({'display' : "none"});
                break;
                case 'line':
                $("#fill-params").css({'display' : "none"});
                $("#line-params").css({'display' : "block"});
		        $("#circle-params").css({'display' : "none"});
                break;
                case 'circle':
                $("#fill-params").css({'display' : "none"});
                $("#line-params").css({'display' : "none"});
		        $("#circle-params").css({'display' : "block"});
                break;
                }
			});
			
			$('#fill-opacity').on("change mousemove", function() {
                $('#fill-opacity-info').html($(this).val());
            });
			
			$('#fill-opacity-hover').on("change mousemove", function() {
                $('#fill-opacity-hover-info').html($(this).val());
            });
			
	    });
	
	
	function editRecord(editRecordNumber) {
		//alert("editing record #" + editRecordNumber);
		//document.getElementById("add-layer-dialog").title = "Editing Layer №" + editRecordNumber;
		//$("div#add-layer-dialog").prop("title", "Editing Layer №" + editRecordNumber);
		var layerParams = layersList["record"]<?php if($isIndexed) echo "[editRecordNumber]" ?>;
		
		resetFormFields();
		
		$("input[name=layer-name]").val(typeof layerParams["name"] === "object" ? "" : layerParams["name"]);
		$("input[name=layer-descr]").val(typeof layerParams["description"] === "object" ? "" : layerParams["description"]);
		$("input[name=layer-id]").val(typeof layerParams["ID"] === "object" ? "" : layerParams["ID"]);
		
		$("select[name=shape-type]").val(layerParams["type"]);
		$("select[name=zoom-bounds]").val(layerParams["zoom-bounds"]);
		$("select[name=filter-type]").val(layerParams["filter"]);
		$("input[name=source-layer]").val(layerParams["source-layer"]);
		$("input[name=source-url]").val(layerParams["source"]["url"]);
		
		//console.warn(layerParams["type"])
		
		switch(layerParams["type"]) {
		    case "line":
			    $("#fill-params").css({'display' : "none"});
                $("#line-params").css({'display' : "block"});
		        $("#circle-params").css({'display' : "none"});
			    $("input[name=line-color]").val(typeof layerParams["paint"]["line-color"] === "object" ? "" : layerParams["paint"]["line-color"]);
		        $("input[name=line-width]").val(typeof layerParams["paint"]["line-width"] === "object" ? "" : layerParams["paint"]["line-width"]);
		        $("input[name=line-opacity]").val(typeof layerParams["paint"]["line-opacity"] === "object" ? "" : layerParams["paint"]["line-opacity"]);
			break;
			case "fill":
			    $("#fill-params").css({'display' : "block"});
                $("#line-params").css({'display' : "none"});
				$("#circle-params").css({'display' : "none"});
			    $("input[name=fill-color]").val(typeof layerParams["paint"]["fill-color"] === "object" ? "" : layerParams["paint"]["fill-color"]);
		        $("range[name=fill-opacity]").val(layerParams["paint"]["fill-opacity"] === "undefined" ? "0.5" : layerParams["paint"]["fill-opacity"]);
		        $("#fill-opacity-info").text(layerParams["paint"]["fill-opacity"] === "undefined" ? "0.5" : layerParams["paint"]["fill-opacity"]);
		        if(typeof layerParams["paint"]["fill-opacity-hover"] === "undefined") {
		            $("input[name=fill-mouse-over]").prop("checked", false);
				    $("range[name=fill-opacity-hover]").val("0.8");
				    $("#fill-opacity-hover-info").text("0.8");
		        } else {
		            $("input[name=fill-mouse-over]").prop("checked", true);
				    $("range[name=fill-opacity-hover]").val(layerParams["paint"]["fill-opacity-hover"]);
				    $("#fill-opacity-hover-info").text(layerParams["paint"]["fill-opacity-hover"]);
		        }
				$("input[name=fill-outline-color]").val(typeof layerParams["paint"]["fill-outline-color"] === "object" ? "" : layerParams["paint"]["fill-outline-color"]);
			break;
			case "circle":
			    $("#fill-params").css({'display' : "none"});
                $("#line-params").css({'display' : "none"});
		        $("#circle-params").css({'display' : "block"});
			    $("input[name=circle-color]").val(typeof layerParams["paint"]["circle-color"] === "object" ? "" : layerParams["paint"]["circle-color"]);
		        $("input[name=circle-opacity]").val(typeof layerParams["paint"]["circle-opacity"] === "object" ? "" : layerParams["paint"]["circle-opacity"]);
		        $("input[name=circle-radius]").val(typeof layerParams["paint"]["circle-radius"] === "object" ? "" : layerParams["paint"]["circle-radius"]);
		        $("input[name=circle-stroke-width]").val(typeof layerParams["paint"]["circle-stroke-width"] === "object" ? "" : layerParams["paint"]["circle-stroke-width"]);
		        $("input[name=circle-stroke-color]").val(typeof layerParams["paint"]["circle-stroke-color"] === "object" ? "" : layerParams["paint"]["circle-stroke-color"]);
		        $("input[name=circle-stroke-opacity]").val(typeof layerParams["paint"]["circle-stroke-opacity"] === "object" ? "" : layerParams["paint"]["circle-stroke-opacity"]);
				if(typeof layerParams["circle-hover"] !== "undefined") {
					if(layerParams["circle-hover"] == "on")
						$("input[name=circle-mouse-over]").prop("checked", true);
					else
		                $("input[name=circle-mouse-over]").prop("checked", false);
				}
			break;
		}
		
		$("input[name=action-type]").val("edit");
		$("span#form-submit-btn-name").text("Apply");
		$("input[name=action-node-num]").val(editRecordNumber);
        //$( "#add-layer-dialog" ).dialog( { autoOpen: true } );
		$( "#add-layer-dialog" ).dialog({ title: "Editing Layer №" + (editRecordNumber + 1)+ "" }).dialog("open");
	}
	
	
	function resetFormFields() {
	           $("input[name=action-type]").val("add");
			   $("input[name=action-node-num]").val("<?php echo $rowNum; ?>");
			   $("span#form-submit-btn-name").text("Add");
			   
			   $("input[name=layer-name]").val("");
		       $("input[name=layer-descr]").val("");
		       $("input[name=layer-id]").val("");
		       $("select[name=zoom-bounds]").val("");
		
	           $("input[name=source-layer]").val("");
		       $("input[name=source-url]").val("");
		
		       $("select[name=filter-type]").val("none");
		       $("select[name=shape-type]").val("line");
		
		       $("input[name=line-color]").val("");
		       $("input[name=line-width]").val("");
		       $("input[name=line-opacity]").val("");
			   $("input[name=fill-mouse-over]").prop("checked", false);
		       $("input[name=fill-color]").val("");
		       $("range[name=fill-opacity]").val("0.5");
		       $("range[name=fill-opacity-hover]").val("0.8");
		       $("#fill-opacity-info").text("0.5");
		       $("#fill-opacity-hover-info").text("0.8");
		       $("input[name=fill-outline-color]").val("");
			   $("input[name=circle-mouse-over]").prop("checked", false);
		       $("input[name=circle-color]").val("");
		       $("input[name=circle-opacity]").val("");
		       $("input[name=circle-radius]").val("");
		       $("input[name=circle-stroke-width]").val("");
		       $("input[name=circle-stroke-color]").val("");
		       $("input[name=circle-stroke-opacity]").val("");
	}
	
	</script>


    </body>
</html>
