angular.module('pickominoGame')				

.factory("GameState", [
	'FrozenDiceArray', 
	'ActiveDiceArray', 
	'GrillWormsArray',
	'GameAction',
	'PlayerNotification',
	'PlayerWormsArray',
	function SaveGameStateFactory(FrozenDiceArray, ActiveDiceArray, GrillWormsArray, GameAction, PlayerNotification, PlayerWormsArray){
	
		var gameState = { 
							gameID: null,
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
				
			},
			
			save: function(){
				console.log(gameState);
			},
			
			load: function(){
				
			},
			
			clear: function(){
				
			}
		};
}]);		