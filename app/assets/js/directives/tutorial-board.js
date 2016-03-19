angular.module('pickominoGame')

.directive("tutorialBoard", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/tutorial-board.html"
	};
});	