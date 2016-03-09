angular.module('pickominoGame')

.directive("gameLogin", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-login.html"
	};
});	