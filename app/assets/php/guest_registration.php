<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$firstname = $request->firstname;
$lastname = $request->lastname;
$username = $request->username;
$password = $request->password;
$password_check = $request->password_check;
$email = $request->email;


$query_username_check="SELECT `id` FROM `".$mySQL_db_table."` WHERE `username`='".mysql_real_escape_string($username)."'";
$query_username_check_run=mysql_query($query_username_check);
if(@$query_username_check_run=mysql_query($query_username_check)){
	$query_username_check_num_rows=mysql_num_rows($query_username_check_run);
	if($query_username_check_num_rows!==0){
		echo 'Username is already taken; please choose another username';
	}else{
		$passwordhash=password_hash($password, PASSWORD_DEFAULT);
		$query_register_user="INSERT INTO `".$mySQL_db_table."` VALUES('','".mysql_real_escape_string($username)."','".mysql_real_escape_string($passwordhash)."','".mysql_real_escape_string($firstname)."','".mysql_real_escape_string($lastname)."','".mysql_real_escape_string($email)."')";
		if(@$query_register_user_run=mysql_query($query_register_user)){
			$query_user_id="SELECT `id` FROM `".$mySQL_db_table."` WHERE `username`='".mysql_real_escape_string($username)."'";
			$query_user_id_run=mysql_query($query_user_id);
			$user_id = mysql_result($query_user_id_run, 0, 'id');
			$_SESSION['user_id']=$user_id;
			echo true;
		}else{
			echo 'Registration Error.';
		}
	}
}else{
	echo 'Server Error.';
}

?>