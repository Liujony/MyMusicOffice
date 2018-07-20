<?php  
	header("content-type:text/html;charset=utf-8");
	session_start();

	// $servername="localhost";
	// $username="root";
	// $password="clay";
	// $datebase="Music";
	// $connect=mysqli_connect($servername,$username,$password,$datebase);
	// if(!$connect){
	// 	die("Error : ".mysqli_connect_errno()." : ".mysqli_connect_error());
	// }

	// $_SESSION['sum']=0;
	// if(isset($_COOKIE["sum"])){
	// 	$_SESSION['sum']=$_COOKIE["sum"];
	// }
	// echo "正弦";
	include_once 'MyMusicOffice.html';	

?>