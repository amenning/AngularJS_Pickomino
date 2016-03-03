angular.module('pickominoGame')

.directive("gamePlayerOptions", function() {
	return {
		restrict: 'E',
		templateUrl: "game-player-options.html"
	};
});	