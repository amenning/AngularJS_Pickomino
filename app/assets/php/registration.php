<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

?>
<div style="text-align: center; margin: auto; padding: 10px;">
	<form action="registration.php" method="POST">
	<h3>Welcome to Pickomino!<br>  
	Please register below.</h3>
	<table style="margin: auto;">
		<tr>
			<td>First Name:</td> 
			<td><input type="text" name="firstname" /></td>
		</tr>
		<tr>
			<td>Last Name:</td> 
			<td><input type="text" name="lastname" /></td>
		</tr>
		<tr>
			<td>Username:</td>
			<td><input type="text" name="username" /></td>
		</tr>
		<tr>
			<td>Password:</td>
			<td><input type="password" name="password" /></td>
		</tr>
		<tr>
			<td>Confirm Password:</td>
			<td><input type="password" name="password_check" /></td>
		</tr>
		<tr>
			<td>Email:</td>
			<td><input type="text" name="email" /></td>
		</tr>
	</table>
	<br>
	<input type="submit" value="Register" />
	</form>

<?php

if(isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['password_check']) && isset($_POST['email'])){
	if(!empty($_POST['firstname']) && !empty($_POST['lastname']) && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['password_check']) && !empty($_POST['email'])){
		$firstname=$_POST['firstname'];
		$lastname=$_POST['lastname'];
		$username=$_POST['username'];
		$password=$_POST['password'];
		$password_check=$_POST['password_check'];
		$email=$_POST['email'];
		if($password!==$password_check){
			echo 'The passwords do not match';
		}else{
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
						header('Location: index.php');
					}else{
						echo 'Registration Error.';
					}
				}
			}else{
				echo 'Server Error.';
			}
		}
	}else{
		echo 'All fields are required.';
	}	
}else{
	echo 'Please fill in all fields.';
}

?>
</div>