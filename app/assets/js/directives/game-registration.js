angular.module('pickominoGame')

.directive("gameRegistration", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-registration.html"
	};
});	