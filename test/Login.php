<?php 
	session_start();
	if($_GET['act']=="count"){
		$_SESSION['sum']++;
		$arr['sum']=$_SESSION['sum'];
		echo json_encode($arr);
		setcookie("sum",$_SESSION['sum'],time()+3600);
	}




 ?>