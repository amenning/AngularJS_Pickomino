angular.module('pickominoGame')		
	
.controller("PlayerOptionsController", [
	'PlayerNumber',
	function(PlayerNumber){
		
		this.setPlayers = function(playerCount){
			PlayerNumber.set(playerCount);
		}; 
		
	}
]);	