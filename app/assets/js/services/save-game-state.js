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
			},
			
			save: function(){
				console.log(gameState);
				
				return $http.post("app/assets/php/game_state.php", gameState)
					.success(function(data){
						console.log(data)
						gameState.gameStateID = data;
					});
			},
			
			load: function(){
				return $http.post("app/assets/php/game_state.php", gameState)
					.success(function(data){
						console.log({grillWormsTest: data});
					});
			},
			
			clear: function(){
				
			}
		};
}]);		