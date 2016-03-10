angular.module('pickominoGame')		
	
.controller("LoginController", [
	'GameAction',
	'GameState',
	'$http',
	function(GameAction, GameState, $http){
		this.gameStatus = GameAction.status;
		
		this.setUser = function(userID){
			console.log(userID);
			GameAction.setStatus('userID', userID);
			GameAction.setStatus('gameLogin', false);
		};
	}
]);	