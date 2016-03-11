angular.module('pickominoGame')		
	
.controller("SetupController", [
	'GameAction',
	'GameState',
	'$http',
	function(GameAction, GameState, $http){
		
		this.setGame = function(type){
			switch(type){
				case "continue":
					GameState.loadGame();
					break;
				case "new":
					GameState.newGame();
					GameAction.setStatus('roll', true);
					GameAction.setStatus('gameSetup', false);
					break;
			};
		};
	}
]);	