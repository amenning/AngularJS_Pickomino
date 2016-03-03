angular.module('pickominoGame')

.directive("gameBoard", function() {
	return {
		restrict: 'E',
		templateUrl: "game-board.html"
	};
});	