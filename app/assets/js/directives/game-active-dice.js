angular.module('pickominoGame')	

.directive("gameActiveDice", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-active-dice.html"
	};
});	