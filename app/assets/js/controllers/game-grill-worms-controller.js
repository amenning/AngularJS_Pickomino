angular.module('pickominoGame')

.controller("GrillWormsController", ['GrillWormsArray', function(GrillWormsArray){
	this.grillWormsValues = GrillWormsArray.array;
	this.deadGrillWormsValues = GrillWormsArray.deadArray;
}]);
