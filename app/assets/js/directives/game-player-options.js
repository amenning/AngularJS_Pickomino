angular.module('pickominoGame')

.directive("gamePlayerOptions", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/game-player-options.html"
	};
});	