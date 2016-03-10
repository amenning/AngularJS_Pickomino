<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQL_db_table = 'game';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

#$player_1_id = $request->player_1_id;
#$player_2_id = $request->player_2_id;
$created_at = time();

$query_create_new_game="INSERT INTO `".$mySQL_db_table."` VALUES('',
																 '',
																 '',	
																 '".mysql_real_escape_string($created_at)."')";

if(@$query_create_new_game_run=mysql_query($query_create_new_game)){
	$query_game_id="SELECT * FROM `".$mySQL_db_table."` WHERE `created_at`='".mysql_real_escape_string($created_at)."'";
	$query_game_id_run=mysql_query($query_game_id);
	echo $game_id = mysql_result($query_game_id_run, 0, 'id');
	#json_encode(unserialize(mysql_result($query_game_state_id_run, 0, 'grillWorms')));
	$_SESSION['game_id']=$game_id;
}
?>