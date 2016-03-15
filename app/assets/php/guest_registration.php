<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$errors = array();  // array to hold validation errors
$data = array();    // array to pass back data

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
		$errors['message'] = 'Username is already taken; please choose another username';
	}else{
		$passwordhash=password_hash($password, PASSWORD_DEFAULT);
		$query_register_user="INSERT INTO `".$mySQL_db_table."` VALUES('','".mysql_real_escape_string($username)."','".mysql_real_escape_string($passwordhash)."','".mysql_real_escape_string($firstname)."','".mysql_real_escape_string($lastname)."','".mysql_real_escape_string($email)."')";
		if(@$query_register_user_run=mysql_query($query_register_user)){
			$query_user_id="SELECT `id` FROM `".$mySQL_db_table."` WHERE `username`='".mysql_real_escape_string($username)."'";
			$query_user_id_run=mysql_query($query_user_id);
			$user_id = mysql_result($query_user_id_run, 0, 'id');
			$_SESSION['user_id']=$user_id;
			$data['success'] = true;
			$data['firstname'] = $firstname;
			$data['user_id'] = $user_id;
		}else{
			$errors['message'] = 'Registration Error.';
		}
	}
}else{
	$errors['message'] = 'Server Error.';
}

if (!empty($errors)) {

  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors']  = $errors;
} else {

  // if there are no errors, return a message
  $data['success'] = true;
  $data['message'] = 'Success!';
}

// return all our data to an AJAX call
echo json_encode($data);

?>