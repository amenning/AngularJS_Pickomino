<?php
require 'core.inc.php';
require 'connect.inc.php';
require 'password.php';

$mySQL_game_state = 'game_state';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$game_id = $request->gameID;


$query = "SELECT * FROM `".$mySQL_game_state."` WHERE `gameID`='".$game_id."' ORDER BY `id` DESC";
if($query_run = mysql_query($query)){
	if($query_result = mysql_result($query_run, 0, 'id')){
		$gameStateID = mysql_result($query_run, 0, 'id');
		$gameStatus = unserialize(mysql_result($query_run, 0, 'gameStatus'));
		$grillWorms = unserialize(mysql_result($query_run, 0, 'grillWorms'));
		$deadGrillWorms = unserialize(mysql_result($query_run, 0, 'deadGrillWorms'));
		$activeDice = unserialize(mysql_result($query_run, 0, 'activeDice'));
		$frozenDice = unserialize(mysql_result($query_run, 0, 'frozenDice'));
		$frozenDiceTotal = unserialize(mysql_result($query_run, 0, 'frozenDiceTotal'));
		$gameStatus = unserialize(mysql_result($query_run, 0, 'gameStatus'));
		$playerMessage = unserialize(mysql_result($query_run, 0, 'playerMessage'));
		$playerWorms = unserialize(mysql_result($query_run, 0, 'playerWorms'));
		$playerWormsTotals = unserialize(mysql_result($query_run, 0, 'playerWormsTotals'));
		
		echo $response = json_encode(array( 'gameStateID' => $gameStateID,
											'gameStatus' => $gameStatus, 
						  					'grillWorms' => $grillWorms,
						  					'deadGrillWorms' => $deadGrillWorms,
											'activeDice' => $activeDice,
											'frozenDice' => $frozenDice,
											'gameStatus' => $gameStatus,
											'playerMessage' => $playerMessage,
											'playerWorms' => $playerWorms,
											'playerWormsTotals' => $playerWormsTotals));						  
	}
}

?>

 