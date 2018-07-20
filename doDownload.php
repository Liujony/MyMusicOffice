<?php 
$filename=$_GET['filename'];
if(is_file($filename)){
	$fileArr=explode("/", $filename);
	$file=fopen($filename, "r");
	header("Content-type: application/octet-stream");
	header("Accept-Ranges:bytes");
	header("Accept-Length:".filesize($filename));
	header("Content-Disposition:attachment; filename=".$fileArr[1]);
	echo fread($file, filesize($filename));
	fclose($file);
}

 ?>