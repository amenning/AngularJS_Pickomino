angular.module('pickominoGame')

.controller("FrozenDiceController", ['FrozenDiceArray', function(FrozenDiceArray){
	this.diceValues = FrozenDiceArray.array;
}]);
