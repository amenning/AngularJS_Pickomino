angular.module('pickominoGame')		
	
.controller("PlayerOptionsController", [
	'PlayerNumber',
	'RollDice',
	function(PlayerNumber, RollDice){
		
		this.setPlayers = function(playerCount){
			PlayerNumber.set(playerCount);
		}; 
		
		this.rollDice = function (){
			RollDice.roll();
		};
		
	}
]);	