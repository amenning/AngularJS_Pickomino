angular.module('pickominoGame')

.directive("commonHeader", function() {
	return {
		restrict: 'E',
		templateUrl: "common-header.html"
	};
});