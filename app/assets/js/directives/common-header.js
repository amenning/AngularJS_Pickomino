angular.module('pickominoGame')

.directive("commonHeader", function() {
	return {
		restrict: 'E',
		templateUrl: "app/templates/directives/common-header.html"
	};
});