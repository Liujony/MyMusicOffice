<?php 

	session_start();
	header("content-type:text/html;charset=utf-8");
	if($_POST['email']&&$_POST['password']){
		$arr=array('status'=>false,'error'=>null,'message'=>null);
		if((!preg_match("/[^a-zA-Z0-9-_]/", $_POST['password']))&&preg_match("/^[a-zA-Z0-9-_]+@([a-zA-Z0-9-_]+\.)+[a-zA-Z0-9-_]+$/",$_POST['email'])){

			include_once 'Mysql.php';
			
			

			if(mysqli_errno($connect)!=0){
				$arr['status']=false;$arr['error']=mysqli_errno($connect);$arr['message']=mysqli_error($connect);
				echo json_encode($arr);
			}else{
				$sql="SELECT UserPass FROM Users WHERE UserEmail='".$_POST['email']."';";
				$result=mysqli_query($connect,$sql);
				$ResultArr=mysqli_fetch_assoc($result);
				if(isset($ResultArr["UserPass"])){
					if(md5($_POST['password'])!==$ResultArr["UserPass"]){
						$arr['status']=false;$arr['error']=$ResultArr;$arr['message']="Your password is WRONG...";
						echo json_encode($arr);
					}else{
						$arr['status']=true;$arr['error']=$ResultArr;
						echo json_encode($arr);
					}
				}else{
					$arr['status']=false;$arr['error']=$ResultArr;
					echo json_encode($arr);
				}
				
			}
				
		}else{
			$arr['status']=false;$arr['message']='FAIL TO LOGIN....';
		 	echo json_encode($arr);
		}
		
	}


 ?>