angular.module('pickominoGame')		
	
.controller("SetupController", [
	'GameAction',
	'GameState',
	'$http',
	function(GameAction, GameState, $http){
		
		this.setGame = function(type){
			switch(type){
				case "continue":
					//GameState.newGame();
					console.log('continue');
					break;
				case "new":
					GameState.newGame();
					GameAction.setStatus('roll', true);
					break;
			};
			GameAction.setStatus('gameSetup', false);
		};
	}
]);	