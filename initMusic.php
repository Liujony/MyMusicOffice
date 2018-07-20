<?php 
	$servername="localhost";
	$username="root";
	$password="clay";
	$database="Music";
	$connect=mysqli_connect($servername,$username,$password,$database);
	if(!$connect){
		die("Error : ".mysqli_connect_errno()." : ".mysqli_connect_error());
	}
	// $dir="/var/www/html/musicoffice/MusicPocket/";
	// $arr=scandir($dir,1);
	// $arr_num=count($arr)-3;
	// for ($i=0;$i<$arr_num;$i++){ 
	// 	$music_arr=scandir($dir.$arr[$i],1);
	// 	$music_num=count($music_arr)-2;
	// 	for ($j=0; $j < $music_num-1; $j++) { 
	// 		$info=explode("-",$music_arr[$j]);
	// 		$Music_Singer=$info[0];
	// 		$Music_Name=explode(".",$info[1])[0];
	// 		$sql="INSERT INTO MusicPocket(Music_Name,Music_Singer,Music_Place,Music_Click) VALUES('$Music_Name','$Music_Singer','$arr[$i]"."/"."$music_arr[$j]',0);";
	// 		mysqli_query($connect,$sql);
	// 		// echo "Singer : ".$Music_Singer."; Song : ".$Music_Name."\n";
	// 		// echo "<br>";
	// 	}
		
	// }
	$sql="SELECT Music_Singer FROM MusicPocket;";
	$result=mysqli_query($connect,$sql);
	$arr=mysqli_fetch_all($result);
	$Singer=null;$SingerName;
	// print_r($arr);
	$k=0;
	for($i=0;$i<count($arr);$i++){
		if(preg_match("/;/", $arr[$i][0])){
			$SingerName=explode(";",$arr[$i][0]);
		}else{
			$SingerName[0]=$arr[$i][0];
		}
		for($j=0;$j<count($SingerName);$j++){
			// print_r($Singer);echo "<br>";
			if($Singer==null){
				$Singer[0]=$SingerName[0];
				$k++;
			}
			if(!in_array($SingerName[$j], $Singer)){
				$Singer[$k]=$SingerName[$j];
				$k++;
			}
		}
	}
	// print_r($Singer);
	for($i=0;$i<count($Singer);$i++){
		$sql="INSERT INTO MusicSinger(Singer) VALUES('$Singer[$i]');";
		mysqli_query($connect,$sql);
	}
	mysqli_close($connect);
 ?>
















