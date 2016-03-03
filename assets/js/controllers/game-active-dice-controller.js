angular.module('pickominoGame')

.controller("ActiveDiceController", ['ActiveDiceArray', function(ActiveDiceArray){
	this.diceValues = ActiveDiceArray.array;
}]);