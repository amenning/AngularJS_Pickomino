angular.module('pickominoGame')		
	
.controller("ActionController", [
	'SetDiceImage', 
	'SetWormImage',
	'CheckValidDiceFreeze', 
	'CheckValidWormTake',
	'CheckValidWormSteal',
	'ActiveDiceFilter', 
	'ActiveDiceArray', 
	'FrozenDiceArray',
	'GrillWormsArray',		
	'PlayerNotification',
	'PlayerWormsArray',
	'RandomDice',
	'GameAction',
	'GameState',
	'$scope',
	function(SetDiceImage, SetWormImage, CheckValidDiceFreeze, CheckValidWormTake, CheckValidWormSteal, ActiveDiceFilter, ActiveDiceArray, FrozenDiceArray, GrillWormsArray, PlayerNotification, PlayerWormsArray, RandomDice, GameAction, GameState, $scope){
		this.activeDice = ActiveDiceArray.array;
		this.frozenDice = FrozenDiceArray.array;
		this.gameStatus = GameAction.status;
	
//		this.freezeDice = function(diceValue){
//			if(GameAction.status.freezeDice===true){
//				if(CheckValidDiceFreeze.validate(diceValue)){
//					ActiveDiceArray.removeHighlight();
//					diceImage = SetDiceImage.imagify(diceValue);
//					count = ActiveDiceFilter.count(diceValue);
//					for(var x=0; x<count; x++){
//						FrozenDiceArray.add({value: diceValue, image: diceImage});	
//					}
//					ActiveDiceArray.remove(diceValue);
//					GameAction.setStatus('roll', true);
//					GameAction.setStatus('takeWorm', true);
//					GameAction.setStatus('freezeDice', false);
//					if(FrozenDiceArray.frozenStatus.haveWorm){
//						GrillWormsArray.highlightWorms(FrozenDiceArray.frozenStatus.sum);
//					}
//					PlayerNotification.setMessage('Please click "roll", or click the worm you would like to take.');
//					GameState.save();
//				}else{
//					PlayerNotification.setMessage('You already froze that number! Please pick a different number.');
//				}
//			}else if(GameAction.status.gameOver===false){
//				PlayerNotification.setMessage('You need to take a worm or reroll the dice.');
//			}
//		};
		
		this.takeWorm = function(wormValue){				
			if(GameAction.status.takeWorm===true){
				if(CheckValidWormTake.validate(wormValue)){
					GrillWormsArray.removeWorm(wormValue);
					PlayerWormsArray.addWorm(wormValue);
					GrillWormsArray.removeWormHighlight();
					GameAction.setStatus('takeWorm', false);
					GameAction.setStatus('freezeDice', false);
					if(GrillWormsArray.array.length === 0){
						GameAction.setStatus('gameOver', true);
						GameAction.setStatus('roll', false);
						PlayerNotification.setMessage('Game Over!');
						GameState.save();
					}else{
						RandomDice.resetDice();
						GameAction.setStatus('roll', true);
						GameAction.switchPlayer();
						PlayerNotification.setMessage('Please roll the dice.');
						GameState.save();
					}
				}else{
					PlayerNotification.setMessage('You cannot take that worm tile.');
				}
			}else if(GameAction.status.roll===true){
				PlayerNotification.setMessage('You need to reroll the dice.');
			}
		};
		
		this.stealWorm = function(wormValue, fromPlayer, index){				
			if(GameAction.status.takeWorm===true && fromPlayer!==GameAction.status.activePlayer){
				if(CheckValidWormSteal.validate(wormValue)  && index===0){
					PlayerWormsArray.removeStolenWorm(wormValue);
					PlayerWormsArray.addWorm(wormValue);
					GrillWormsArray.removeWormHighlight();
					GameAction.setStatus('takeWorm', false);
					GameAction.setStatus('freezeDice', false);
					RandomDice.resetDice();
					GameAction.setStatus('roll', true);
					GameAction.switchPlayer();
					PlayerNotification.setMessage('Please roll the dice.');
					GameState.save();
				}else{
					PlayerNotification.setMessage('You cannot take that worm tile.');
				}
			}
		};			
		
	}
]);	