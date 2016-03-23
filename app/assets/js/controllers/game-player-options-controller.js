angular.module('pickominoGame')		
	
.controller("PlayerOptionsController", [
	'PlayerNumber',
	'RollDice',
	'BunkPenalty',
	function(PlayerNumber, RollDice, BunkPenalty){
		
		this.setPlayers = function(playerCount){
			PlayerNumber.set(playerCount);
		}; 
		
		this.rollDice = function (){
			RollDice.roll();
		};
		
		this.bunkPenalty = function(){
			BunkPenalty.penalize();
		}
		
	}
]);	