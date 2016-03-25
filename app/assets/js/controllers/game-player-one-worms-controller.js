angular.module('pickominoGame')

.controller("PlayerOneWormsController", ['PlayerWormsArray', 'StealWormAction', function(PlayerWormsArray, StealWormAction){
	this.wormValues = PlayerWormsArray.array[0];
	this.status = PlayerWormsArray.status[0];
	
	this.stealWorm = function(wormValue, fromPlayer, index){
		StealWormAction.steal(wormValue, fromPlayer, index);
	};
}]);
	