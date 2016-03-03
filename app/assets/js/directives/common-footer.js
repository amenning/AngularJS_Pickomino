angular.module('pickominoGame')			

.directive("commonFooter", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/common-footer.html"
	};
});