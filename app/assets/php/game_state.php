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
$created_at = time();

if(isset($grillWorms) && isset($activeDice) && isset($frozenDice)){
	$query_save_game_state="INSERT INTO `".$mySQL_db_table."` VALUES('','".mysql_real_escape_string(serialize($grillWorms))."','".mysql_real_escape_string(serialize($activeDice))."','".mysql_real_escape_string(serialize($frozenDice))."','".mysql_real_escape_string($created_at)."')";
	if(@$query_save_game_state_run=mysql_query($query_save_game_state)){
		$query_game_state_id="SELECT `id` FROM `".$mySQL_db_table."` WHERE `created_at`='".mysql_real_escape_string($created_at)."'";
		$query_game_state_id_run=mysql_query($query_game_state_id);
		echo $game_state_id = mysql_result($query_game_state_id_run, 0, 'id');
		$_SESSION['game_state_id']=$game_state_id;
	}
}
?>