angular.module('pickominoGame')

.directive("gameBoard", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-board.html"
	};
});	