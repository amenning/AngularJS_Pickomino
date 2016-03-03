angular.module('pickominoGame')

.directive("gameHeader", function() {
	return {
		restrict: 'E',
		templateUrl: "game-header.html"
	};
});