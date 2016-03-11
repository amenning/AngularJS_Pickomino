<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQL_game = 'game';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$player_id = $request->userID;


$query = "SELECT `id` FROM `".$mySQL_game."` WHERE `player_1_id`='".$player_id."' ORDER BY `id` DESC";
if($query_run = mysql_query($query)){
	$rows = mysql_num_rows($query_run);
	if($rows>0){		
		$query_result = mysql_result($query_run, 0, 'id');
		echo $query_result;
	}else{
		echo $response = false;
	}
}

?>