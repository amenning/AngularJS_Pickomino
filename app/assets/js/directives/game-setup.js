angular.module('pickominoGame')

.directive("gameSetup", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-setup.html"
	};
});	