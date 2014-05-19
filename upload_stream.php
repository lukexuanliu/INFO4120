<?php

	if($_FILES){
		$filename = $_FILES['userfile'] ['tmp_name'];
		$dir = "../indoor_localization_system/";
		$name = "sensorStrengths.txt";
		$new_file = $dir . $name;
	    move_uploaded_file($filename, $new_file);
	    print_r($filename.' received');
	}
	if($_POST){
		print_r($_POST);
	}

?>