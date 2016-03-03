angular.module('pickominoGame')		

.directive("gamePlayerWorms", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-player-worms.html"
	};
});	