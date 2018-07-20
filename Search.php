<?php 

	// like _  % num.....
	// LIMT 0 10
	header("content-type:text/html;charset=utf-8");
	$arr=array('status'=>false,'error'=>null,'message'=>null);
	if(isset($_POST['searchcontent'])&&(!preg_match("/[`~\[\]\{\}\\\|;\':\"\,\.\/?\<\>\s]/", $_POST['searchcontent']))){

		include_once 'Mysql.php';

		

		$sql_1="SELECT Music_Name,Music_Singer,Music_Place FROM MusicPocket WHERE Music_Name LIKE '".$_POST['searchcontent']."%';";
		$sql_2="SELECT Singer FROM MusicSinger WHERE Singer LIKE '".$_POST['searchcontent']."%';";
		if(mysqli_errno($connect)!=0){
			$arr['status']=false;$arr['error']=mysqli_errno($connect);$arr['message']=mysqli_error($connect);
			echo json_encode($arr);
		}else{
			$Song=mysqli_query($connect,$sql_1);
			$SongArr=mysqli_fetch_all($Song);
			$Singer=mysqli_query($connect,$sql_2);
			$SingerArr=mysqli_fetch_all($Singer);
			$arr['status']=true;$arr['message']=array($SongArr,$SingerArr);
			echo json_encode($arr);
		}

	}else{
		$arr['status']=false;
		echo json_encode($arr);
	}
 ?>