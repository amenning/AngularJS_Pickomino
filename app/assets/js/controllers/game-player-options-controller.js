angular.module('pickominoGame')		
	
.controller("PlayerOptionsController", [
	'GameAction',
	'PlayerNumber',
	'RollDice',
	'BunkPenalty',
	function(GameAction, PlayerNumber, RollDice, BunkPenalty){
		this.gameStatus = GameAction.status;
		
		this.setPlayers = function(playerCount){
			PlayerNumber.set(playerCount);
		}; 
		
		this.rollDice = function (){
			RollDice.roll();
		};
		
		this.bunkPenalty = function(){
			BunkPenalty.penalize();
		};
		
	}
]);	