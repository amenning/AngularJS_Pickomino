angular.module('pickominoGame')	

.directive("gameActiveDice", function() {
	return {
		restrict: 'E',
		templateUrl: "game-active-dice.html"
	};
});	