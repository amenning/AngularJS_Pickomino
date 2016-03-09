angular.module('pickominoGame')

.directive("gameBody", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-body.html"
	};
});	