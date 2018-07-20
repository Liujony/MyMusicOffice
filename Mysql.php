<?php 
	
	$servername="localhost";
	$username="root";
	$password="clay";
	$datebase="Music";
	$connect=mysqli_connect($servername,$username,$password,$datebase);
	if(!$connect){
		die("Error : ".mysqli_connect_errno()." : ".mysqli_connect_error());
	}
	mysqli_query($connect,"set names 'utf8'");


 ?>