<?php
ob_start();
session_start();

$current_file = $_SERVER['SCRIPT_NAME']; //specifies the page that you are on now
if(isset($_SERVER['HTTP_REFERER']) && !empty($_SERVER['HTTP_REFERER'])){
	$http_referer = $_SERVER['HTTP_REFERER']; //specifies the page we have come from
}
	
function loggedin(){
	if(isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])){
		return true;
	}else{
		return false;
	}
}

function getuserfield($field){
	require 'connect.inc.php';
	$query = "SELECT `".$field."` FROM `".$mySQL_db_table."` WHERE `id`='".$_SESSION['user_id']."'";
	if($query_run = mysql_query($query)){
		if($query_result = mysql_result($query_run, 0, $field)){
			return $query_result;
		}
	}
}

?>