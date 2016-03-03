angular.module('pickominoGame')

.directive("gameHeader", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-header.html"
	};
});