<?php
require '/AngularJS_Pickomino_Project/InProgress/app/assets/php/core.inc.php';
session_destroy();
header('Location: '.$http_referer);
?>