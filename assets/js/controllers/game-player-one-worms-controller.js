angular.module('pickominoGame')

.controller("PlayerOneWormsController", ['PlayerWormsArray', function(PlayerWormsArray){
	this.wormValues = PlayerWormsArray.array[0];
	this.status = PlayerWormsArray.status[0];
}]);
	