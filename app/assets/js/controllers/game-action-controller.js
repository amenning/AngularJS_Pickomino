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
				
		this.stealWorm = function(wormValue, fromPlayer, index){				
			if(GameAction.status.takeWorm===true && fromPlayer!==GameAction.status.activePlayer){
				if(CheckValidWormSteal.validate(wormValue)  && index===0){
					PlayerWormsArray.removeStolenWorm(wormValue);
					PlayerWormsArray.addWorm(wormValue);
					GrillWormsArray.removeWormHighlight();
					GameAction.setStatus('takeWorm', false);
					GameAction.setStatus('freezeDice', false);
					RandomDice.resetDice();
					GameAction.setStatus('roll', true);
					GameAction.switchPlayer();
					PlayerNotification.setMessage('Please roll the dice.');
					GameState.save();
				}else{
					PlayerNotification.setMessage('You cannot take that worm tile.');
				}
			}
		};			
		
	}
]);	