<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

if(loggedin()){
	$firstname = getuserfield('firstname');
	$lastname = getuserfield('lastname');
?>

<div style="text-align: center; margin: auto; padding: 10px;">
 Welcome <?php echo $firstname.' '.$lastname; ?>, <a href="logout.php">Log out</a>
</div>

<?php
header('Location: /AngularJS_Pickomino_Project/InProgress/pickomino.html');

}else{
	include 'loginform.inc.php';
}

?>