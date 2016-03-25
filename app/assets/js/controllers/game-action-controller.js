angular.module('pickominoGame')		
	
.controller("ActionController", [
	'SetDiceImage', 
	'SetWormImage',
	'CheckValidDiceFreeze', 
	'CheckValidWormTake',
	'CheckValidWormSteal',
	'ActiveDiceFilter', 
	'ActiveDiceArray', 
	'FrozenDiceArray',
	'GrillWormsArray',		
	'PlayerNotification',
	'PlayerWormsArray',
	'RandomDice',
	'GameAction',
	'GameState',
	'$scope',
	function(SetDiceImage, SetWormImage, CheckValidDiceFreeze, CheckValidWormTake, CheckValidWormSteal, ActiveDiceFilter, ActiveDiceArray, FrozenDiceArray, GrillWormsArray, PlayerNotification, PlayerWormsArray, RandomDice, GameAction, GameState, $scope){
		this.activeDice = ActiveDiceArray.array;
		this.frozenDice = FrozenDiceArray.array;
		this.gameStatus = GameAction.status;
		
	}
]);	