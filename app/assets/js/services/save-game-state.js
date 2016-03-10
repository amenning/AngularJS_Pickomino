angular.module('pickominoGame')				

.factory("GameState", [
	'FrozenDiceArray', 
	'ActiveDiceArray', 
	'GrillWormsArray',
	'GameAction',
	'PlayerNotification',
	'PlayerWormsArray',
	'$http',
	function SaveGameStateFactory(FrozenDiceArray, ActiveDiceArray, GrillWormsArray, GameAction, PlayerNotification, PlayerWormsArray, $http){
	
		var gameState = { 
							gameID: null,
							gameStateID: null,
							gameStatus: GameAction.status,
							grillWorms: GrillWormsArray.array,
							deadGrillWorms: GrillWormsArray.deadArray,
							playerMessage: PlayerNotification.message,
						    activeDice: ActiveDiceArray.array,
						    frozenDice: FrozenDiceArray.array,
						    frozenDiceTotal: FrozenDiceArray.frozenStatus,
						    playerWorms: PlayerWormsArray.array,
						    playerWormsTotals: PlayerWormsArray.status
		   				};
		
		return {
			newGame: function(){
				//Set new game ID
				console.log(gameState);
				data = {userID: gameState.gameStatus.userID};
				
				return $http.post("app/assets/php/new_game.php", data)
					.success(function(data){
						console.log(data)
						gameState.gameID = data;
					});
			},
			
			save: function(){
				console.log('save');
				
				return $http.post("app/assets/php/game_state.php", gameState)
					.success(function(data){
						console.log(data)
						gameState.gameStateID = data;
						console.log(gameState);
					});
			},
			
			loadGame: function(){
				data = {userID: gameState.gameStatus.userID};
				gameStateScope = this;
				
				return $http.post("app/assets/php/load_game.php", data)
					.success(function(data){
						gameState.gameID=data;
						gameStateScope.loadGameState();
					});
			},
			
			loadGameState: function(){
				data = {gameID: gameState.gameID};
				
				return $http.post("app/assets/php/load_game_state.php", data)
					.success(function(data){
						gameState.gameStateID = data.gameStateID;
						GameAction.status = data.gameStatus;
						GrillWormsArray.array = data.grillWorms;
						GrillWormsArray.deadArray = data.deadGrillWorms;
						PlayerNotification.message = data.playerMessage;
						ActiveDiceArray.loadState(data.activeDice);
						FrozenDiceArray.loadState(data.frozenDice);
						FrozenDiceArray.frozenStatus= data.frozenDiceTotal;
						PlayerWormsArray.array = data.playerWorms;
						PlayerWormsArray.status = data.playerWormsTotals;
						console.log(gameState);
						console.log(FrozenDiceArray.array);
					});
			},
			
			clear: function(){
				
			}
		};
}]);		