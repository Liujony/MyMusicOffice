<?php 
	header("content-type:text/html;charset=utf-8");
	if($_POST['name']&&$_POST['email']&&$_POST['password']){
		$arr=array('status'=>false,'error'=>null,'message'=>null);
		if((!preg_match("/[^a-zA-Z0-9-_]/", $_POST['password']))&&(!preg_match("/[[`~\[\]\{\}\\\|;\':\"\,\.\/?\<\>\s]]/", $_POST['name']))&&preg_match("/^[a-zA-Z0-9-_]+@([a-zA-Z0-9-_]+\.)+[a-zA-Z0-9-_]+$/",$_POST['email'])){
			// 以上部分为正则判断，别问我，我也看不懂，虽然是我打的。
			include_once 'Mysql.php';
			$sql="INSERT Users(UserName,UserEmail,UserPass,UserTime) VALUE('".$_POST['name']."','".$_POST['email']."','".md5($_POST['password'])."',now());";
			$result=mysqli_query($connect,$sql);
			if(mysqli_errno($connect)!=0){
				$arr['status']=false;$arr['error']=mysqli_errno($connect);$arr['message']=mysqli_error($connect);
				echo json_encode($arr);
			}else{
				$arr['status']=true;
				echo json_encode($arr);
			}


		}else{
			$arr['status']=false;$arr['message']='FAIL TO REGISTER....';
			echo json_encode($arr);
		}
		
	}



?>