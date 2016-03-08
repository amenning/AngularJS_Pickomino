<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQL_db_table = 'game_state';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$grillWorms = $request->grillWorms;
$activeDice = $request->activeDice;
$frozenDice = $request->frozenDice;

if(isset($grillWorms) && isset($activeDice) && isset($frozenDice)){
	echo "test";
	$query_save_game_state="INSERT INTO `".$mySQL_db_table."` VALUES('','".mysql_real_escape_string(serialize($grillWorms))."','".mysql_real_escape_string(serialize($activeDice))."','".mysql_real_escape_string(serialize($frozenDice))."')";
	if(@$query_save_game_state_run=mysql_query($query_save_game_state)){
		echo "save succeeded";
		#$query_user_id="SELECT `id` FROM `".$mySQL_db_table."` WHERE `username`='".mysql_real_escape_string($username)."'";
		#$query_user_id_run=mysql_query($query_user_id);
		#$user_id = mysql_result($query_user_id_run, 0, 'id');
		#$_SESSION['user_id']=$user_id;
	}
}
?>