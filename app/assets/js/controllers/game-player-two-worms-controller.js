angular.module('pickominoGame')

.controller("PlayerTwoWormsController", ['PlayerWormsArray', function(PlayerWormsArray){
	this.wormValues = PlayerWormsArray.array[1];
	this.status = PlayerWormsArray.status[1];
}]);	