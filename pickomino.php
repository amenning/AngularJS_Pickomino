<?php
require '/app/assets/php/core.inc.php';
require '/app/assets/php/connect.inc.php';
require '/app/assets/php/password.php';

if(loggedin()){
	$firstname = getuserfield('firstname');
	$lastname = getuserfield('lastname');
		
?>

<head>
	<meta charset="utf-8" />
	<title>Angular Pickomino</title>
	<link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="node_modules/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="app/assets/css/main.css">
	<link rel="stylesheet" type="text/css" href="app/assets/css/board.css">
</head>
<body ng-app="pickominoGame">
<div style="text-align: center; margin: auto; padding: 10px;">
 Welcome <?php echo $firstname.' '.$lastname; ?>, <a href="/app/assets/php/logout.php">Log out</a>
</div>
	<game-header></game-header>
	
	<game-board></game-board>
	
	<common-footer></common-footer>
	
	
	<!-- Vendors -->
	<script src="node_modules/jquery/dist/jquery.js"></script>
	<script src="node_modules/bootstrap/dist/js/bootstrap.js"></script>
	<script src="node_modules/angular/angular.js"></script>
	
	<script src="app/app.module.js"></script>
	
	<!-- Directives -->
	<script src="app/assets/js/directives/common-header.js"></script>
	<script src="app/assets/js/directives/game-header.js"></script>
	<script src="app/assets/js/directives/game-board.js"></script>
	<script src="app/assets/js/directives/game-grill-worms.js"></script>
	<script src="app/assets/js/directives/game-player-options.js"></script>
	<script src="app/assets/js/directives/game-active-dice.js"></script>
	<script src="app/assets/js/directives/game-frozen-dice.js"></script>
	<script src="app/assets/js/directives/game-player-worms.js"></script>
	<script src="app/assets/js/directives/common-footer.js"></script>
	
	<!-- Services -->
	<script src="app/assets/js/services/set-dice-image.js"></script>
	<script src="app/assets/js/services/set-worm-image.js"></script>
	<script src="app/assets/js/services/get-worm-type.js"></script>
	<script src="app/assets/js/services/active-dice-array.js"></script>
	<script src="app/assets/js/services/frozen-dice-array.js"></script>
	<script src="app/assets/js/services/grill-worms-array.js"></script>
	<script src="app/assets/js/services/game-action.js"></script>
	<script src="app/assets/js/services/player-notification.js"></script>
	<script src="app/assets/js/services/player-worms-array.js"></script>
	<script src="app/assets/js/services/check-valid-dice-freeze.js"></script>
	<script src="app/assets/js/services/check-valid-worm-take.js"></script>
	<script src="app/assets/js/services/check-valid-worm-steal.js"></script>
	<script src="app/assets/js/services/active-dice-filter.js"></script>
	<script src="app/assets/js/services/random-dice.js"></script>
	<script src="app/assets/js/services/save-game-state.js"></script>
	
	<!-- Controllers -->
	<script src="app/assets/js/controllers/game-grill-worms-controller.js"></script>
	<script src="app/assets/js/controllers/game-active-dice-controller.js"></script>
	<script src="app/assets/js/controllers/game-frozen-dice-controller.js"></script>
	<script src="app/assets/js/controllers/game-player-notification-controller.js"></script>
	<script src="app/assets/js/controllers/game-player-one-worms-controller.js"></script>
	<script src="app/assets/js/controllers/game-player-two-worms-controller.js"></script>
	<script src="app/assets/js/controllers/game-action-controller.js"></script>
	<script>
		$(function() {
			$('.nav-tabs a').click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			});
		});
	</script>		
	
</body>

<?php
}else{
	header('Location: /app/assets/php/index.php');
}
?>