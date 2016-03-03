angular.module('pickominoGame')		

.directive("gameFrozenDice", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-frozen-dice.html"
	};
});	