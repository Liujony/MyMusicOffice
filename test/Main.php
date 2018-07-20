<?php 

	// Login
	session_start();
	$_SESSION['sum']=0;
	if(isset($_COOKIE["sum"])){
		$_SESSION['sum']=$_COOKIE["sum"];
	}
	
	include_once 'test.html';




 ?>