angular.module('pickominoGame')		

.directive("gameFrozenDice", function() {
	return {
		restrict: 'E',
		templateUrl: "game-frozen-dice.html"
	};
});	