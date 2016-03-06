<?php
require '/app/assets/php/core.inc.php';
session_destroy();
header('Location: '.$http_referer);
?>