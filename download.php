<?php 
	$servername="localhost";
	$username="root";
	$password="clay";
	$database="Music";
	$connect=mysqli_connect($servername,$username,$password,$database);
	if(!$connect){
		die("Error : ".mysqli_connect_errno()." : ".mysqli_connect_error());
	}
	$dir="/var/www/html/musicoffice/MusicPocket/";
	$sql="SELECT Music_Place FROM MusicPocket;";
	$result=mysqli_query($connect,$sql);
	$ResultArr=mysqli_fetch_all($result);
	echo json_encode($ResultArr);


?>


