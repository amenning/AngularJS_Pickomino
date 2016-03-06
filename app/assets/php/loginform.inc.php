<?php

if(isset($_POST['username']) && isset($_POST['password'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
		
	if(!empty($username) && !empty($password)){
		$query_username = "SELECT `id`,`password` FROM `".$mySQL_db_table."` WHERE `username`='".mysql_real_escape_string($username)."'";
		if($query_username_run = mysql_query($query_username)){
			$query_username_num_rows = mysql_num_rows($query_username_run);
			if($query_username_num_rows!=1){
				echo 'Invalid username/password.';
			}else if($query_username_num_rows==1){
				$user_id = mysql_result($query_username_run, 0, 'id');
				$user_password_hash = mysql_result($query_username_run, 0, 'password');
				if(@password_verify($password, $user_password_hash)){				
					$_SESSION['user_id']=$user_id;
					header('Location: index.php');
				}else{
					echo 'Invalid username/password.';
				}
			}
		}
		
		
	}else{
		echo 'You must supply a username and password';
	}
}

?>
<div style="text-align: center; margin: auto; padding: 10px;">
<form action="<?php echo $current_file; ?>" method="POST">
Welcome to Pickomino!<br><br>
Please log in below or <a href="registration.php">Register</a><br><br>
Username: <input type="text" name="username"><br><br> 
Password: <input type="password" name="password"> <br><br>
<input type="submit" value="Log in">
</form>
<div>