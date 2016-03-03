angular.module('pickominoGame')

.directive("gameGrillWorms", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-grill-worms.html"
	};
});