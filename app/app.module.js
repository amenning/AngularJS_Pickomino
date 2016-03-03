(function(){
	angular.module('pickominoGame', [])
	
	.directive("commonHeader", function() {
		return {
			restrict: 'E',
			templateUrl: "common-header.html"
		};
	})
	
	.directive("gameHeader", function() {
		return {
			restrict: 'E',
			templateUrl: "game-header.html"
		};
	})
	
	.directive("gameBoard", function() {
		return {
			restrict: 'E',
			templateUrl: "game-board.html"
		};
	})	
	
	.directive("gameGrillWorms", function() {
		return {
			restrict: 'E',
			templateUrl: "game-grill-worms.html"
		};
	})		
	
	.directive("gamePlayerOptions", function() {
		return {
			restrict: 'E',
			templateUrl: "game-player-options.html"
		};
	})		

	.directive("gameActiveDice", function() {
		return {
			restrict: 'E',
			templateUrl: "game-active-dice.html"
		};
	})		
	
	.directive("gameFrozenDice", function() {
		return {
			restrict: 'E',
			templateUrl: "game-frozen-dice.html"
		};
	})	
	
	.directive("gamePlayerWorms", function() {
		return {
			restrict: 'E',
			templateUrl: "game-player-worms.html"
		};
	})			
	
	.directive("commonFooter", function() {
		return {
			restrict: 'E',
			templateUrl: "common-footer.html"
		};
	})
			
	
	.factory("SetDiceImage", function SetDiceImageFactory(){
		return {
			imagify: function(diceValue){
				switch(diceValue){
					case 1:
						return 'assets/img/DiceFaceOne.png';
						break;
					case 2:
						return 'assets/img/DiceFaceTwo.png';
						break;
					case 3:
						return 'assets/img/DiceFaceThree.png';
						break;
					case 4:
						return 'assets/img/DiceFaceFour.png';
						break;
					case 5:
						return 'assets/img/DiceFaceFive.png';
						break;
					case 6:
						return 'assets/img/OneWormTile.png';
						break;
				};
			}
		};
	})
	
	.factory("SetWormImage", function SetDiceImageFactory(){
		return {
			imagify: function(wormValue){
				switch(wormValue){
					case 21:
					case 22:
					case 23:
					case 24:
						return 'assets/img/OneWormTile.png';
						break;
					case 25:
					case 26:
					case 27:
					case 28:
						return 'assets/img/TwoWormTile.png';
						break;
					case 29:
					case 30:
					case 31:
					case 32:
						return 'assets/img/ThreeWormTile.png';
						break;
					case 33:
					case 34:
					case 35:
					case 36:
						return 'assets/img/FourWormTile.png';
						break;
				};
			}
		};
	})	

	.factory("GetWormType", function SetDiceImageFactory(){
		return {
			amount: function(wormValue){
				switch(wormValue){
					case 21:
					case 22:
					case 23:
					case 24:
						return 1;
						break;
					case 25:
					case 26:
					case 27:
					case 28:
						return 2;
						break;
					case 29:
					case 30:
					case 31:
					case 32:
						return 3;
						break;
					case 33:
					case 34:
					case 35:
					case 36:
						return 4;
						break;
				};
			}
		};
	})	
	

	.factory("ActiveDiceArray", ['$filter', 'SetDiceImage', function ActiveDiceFactory($filter, SetDiceImage, $scope){
		
		var activeDiceArray = [ ];
		
		for(var x=0, diceValue, diceImage; x<8; x++){
			diceValue=6;
			diceImage=SetDiceImage.imagify(diceValue);
			activeDiceArray.push({value: diceValue, image: diceImage, canFreeze: false});
		}
		
		return {
			array: activeDiceArray,
			
			remove: function(diceValue){	
				for(var x=activeDiceArray.length-1; x>=0; x--){
					if(activeDiceArray[x].value === diceValue){
						activeDiceArray.splice(x, 1);
					}
				}
			},
			
			removeHighlight: function(){
				for(var x=activeDiceArray.length-1; x>=0; x--){
					activeDiceArray[x].canFreeze = false;
				}
			}
		};
	}])
	
	
	.factory("GrillWormsArray", ['SetWormImage', function GrillWromsFactory(SetWormImage){

		var grillWormsArray = [ ];
		
		var deadGrillWormsArray = [ ];
		
		for(var x=21, wormValue, wormImage; x<=36; x++){
			wormValue=x;
			wormImage=SetWormImage.imagify(wormValue);
			grillWormsArray.push({value: wormValue, image: wormImage, canTake: false});
		}

		
		return {
			array: grillWormsArray,

			deadArray: deadGrillWormsArray,
			
			removeWorm: function(wormValue){	
				for(var x=grillWormsArray.length-1; x>=0; x--){
					if(grillWormsArray[x].value === wormValue){
						grillWormsArray.splice(x, 1);
					}
				}
			},
			
			addWorm: function(wormValue){
				grillArrayLength = grillWormsArray.length;
				wormImage = SetWormImage.imagify(wormValue);
				inserted = false;
				if(grillWormsArray[grillArrayLength-1].value < wormValue){
					grillWormsArray.push({value: wormValue, image:wormImage, canTake: false});
					inserted = true;
				}
				for(var x=grillArrayLength-1; x>0; x--){
					if(grillWormsArray[x-1].value < wormValue && wormValue < grillWormsArray[x].value){
						grillWormsArray.splice(x, 0, {value: wormValue, image:wormImage, canTake: false});
						inserted = true;
					}
				}				
				if(inserted === false){
					grillWormsArray.unshift({value: wormValue, image:wormImage, canTake: false});
				}
			},
			
			removeBunkWorm: function(wormValue){
				highestGrillWormValue = grillWormsArray[grillWormsArray.length-1].value;
				if(highestGrillWormValue !== wormValue){
					grillWormsArray.pop();
					wormImage = SetWormImage.imagify(highestGrillWormValue);
					deadGrillWormsArray.unshift({value: highestGrillWormValue, image:wormImage});
				}
			},
			
			highlightWorms: function(frozenDiceSum){
				for(var x=grillWormsArray.length-1; x>=0; x--){
					if(grillWormsArray[x].value <= frozenDiceSum){
						grillWormsArray[x].canTake=true;
					}else{
						grillWormsArray[x].canTake=false;
					}
				}
			},
			
			removeWormHighlight: function(){
				for(var x=grillWormsArray.length-1; x>=0; x--){					
						grillWormsArray[x].canTake=false;
				}
			}
		};
	}])
	
	
	.factory("FrozenDiceArray", [function FrozenDiceFactory(){
		
		var frozenDiceArray = [];
		
		var frozenDiceStatus = {
								sum: 0,
								haveWorm: false
								};
		
		return {
			array: frozenDiceArray,
		
			add: function(dice){
				frozenDiceArray.push(dice);
				if(dice.value<=5){
					frozenDiceStatus.sum += dice.value;
				}else{
					frozenDiceStatus.sum += 5;
					frozenDiceStatus.haveWorm = true;
				}
				
			},
			
			emptyDice: function(){
				for(var i=frozenDiceArray.length; i>0; i--){
					frozenDiceArray.pop();
				};
				frozenDiceStatus.sum = 0;
				frozenDiceStatus.haveWorm = false;
			},
			
			frozenStatus: frozenDiceStatus
		};
	}])	
	
	.factory("GameAction", [
		'FrozenDiceArray', 
		'ActiveDiceArray', 
		'GrillWormsArray',
		'CheckValidDiceFreeze',
		'CheckValidWormTake',
		function GameActionFactory(FrozenDiceArray, ActiveDiceArray, GrillWormsArray, CheckValidDiceFreeze, CheckValidWormTake){
		
			var gameActionStatus = {
				gameSetup: true,
				roll: false,
				freezeDice: false,
				takeWorm: false,
				bunk: false,
				gameOver: false,
				numPlayers: 1,
				activePlayer: 1
			};
			
			return {
				status: gameActionStatus,
			
				setStatus: function(action, status){
					gameActionStatus[action] = status;		
				},
				
				checkMoveAvailable: function(){
					var canDiceFreeze = false;
					var canTakeWorm = false;
					for(var x=0; x<ActiveDiceArray.array.length; x++){
						if(CheckValidDiceFreeze.validate(ActiveDiceArray.array[x].value)){
							canDiceFreeze = true;
							ActiveDiceArray.array[x].canFreeze = true;
						}else{
							ActiveDiceArray.array[x].canFreeze = false;
						}
					}
					//canTakeWorm = CheckValidWormTake.validate(FrozenDiceArray.frozenStatus.sum);
					if(!canDiceFreeze){
						gameActionStatus.bunk=true;
					}
				}
			};
	}])		

	.factory("PlayerNotification", [function PlayerNotificationFactory(){
		
		var playerMessage = {info : 'Goal: Try To Collect All The Worms!  Click "Roll" to Start!'};
		
		return {
			message: playerMessage,
			
			setMessage: function(textMessage){
				playerMessage.info = textMessage;
			}
		
		};
	}])	
	
	.factory("PlayerWormsArray", ['SetWormImage', 'GetWormType', function PlayerWromsFactory(SetWormImage, GetWormType){
		var playerWormsArray = [ ];
		
		var playerStatus = { total: 0 };
		
		return {
			array: playerWormsArray,
			
			status: playerStatus,
			
			addWorm: function(wormValue){	
				wormImage = SetWormImage.imagify(wormValue);
				playerWormsArray.unshift({value: wormValue, image: wormImage});
				playerStatus.total += GetWormType.amount(wormValue);
			},
			
			removeBunkWorm: function(){
				var wormValue = playerWormsArray[0].value;
				playerWormsArray.shift();
				playerStatus.total -= GetWormType.amount(wormValue);
				return wormValue;
			}
		};
	}])	
	
	.factory("CheckValidDiceFreeze", [
		'$filter', 
		'FrozenDiceArray',
		function CheckValidDiceFreezeFactory($filter, FrozenDiceArray){
			return {
				validate: function(freezeValue){
					var found = $filter('filter')(FrozenDiceArray.array, {value: freezeValue}, true);
					return (found.length===0);				
				}
			};
		}
	])
	
	.factory("CheckValidWormTake", [
		'$filter', 
		'GrillWormsArray',
		'FrozenDiceArray',
		function CheckValidWormTakeFactory($filter, GrillWormsArray, FrozenDiceArray){
			return {
				validate: function(wormValue){
					var enoughDiceValue = (wormValue <= FrozenDiceArray.frozenStatus.sum);
					var foundFrozenWormDie = $filter('filter')(FrozenDiceArray.array, {value: 6}, true);					
					return (enoughDiceValue && foundFrozenWormDie);				
				}
			};
		}
	])	
	
	.factory("ActiveDiceFilter", [
		'$filter', 
		'ActiveDiceArray', 
		function ActiveDiceFilterFactory($filter, ActiveDiceArray){
			return {
				count: function(value){
					var found = $filter('filter')(ActiveDiceArray.array, {value: value}, true);
					return found.length;				
				}
			};
		}
	])
	
	.factory("RandomDice", [
		'ActiveDiceArray', 
		'FrozenDiceArray', 
		'SetDiceImage',
		function RandomDiceFactory(ActiveDiceArray, FrozenDiceArray, SetDiceImage){
			return 	{	
			
				roll:	function(){
							for(var x=0; x<ActiveDiceArray.array.length; x++){
								// Returns a random integer between min (included) and max (excluded)
								// Using Math.round() will give you a non-uniform distribution!
								ActiveDiceArray.array[x].value=Math.floor(Math.random() * (7 - 1)) + 1;
								ActiveDiceArray.array[x].image=SetDiceImage.imagify(ActiveDiceArray.array[x].value);
							}
						},

				resetDice:	function(){
								for(var i=ActiveDiceArray.array.length; i>0; i--){
									ActiveDiceArray.array.pop();
								}
								for(var x=0, diceValue, diceImage; x<8; x++){
									diceValue=6;
									diceImage=SetDiceImage.imagify(diceValue);
									ActiveDiceArray.array.push({value: diceValue, image: diceImage, canFreeze: false});
								}
								FrozenDiceArray.emptyDice();
							}						
			};
		}
	])	
	
	.controller("GrillWormsController", ['GrillWormsArray', function(GrillWormsArray){
		this.grillWormsValues = GrillWormsArray.array;
		this.deadGrillWormsValues = GrillWormsArray.deadArray;
	}])	
	
	.controller("ActiveDiceController", ['ActiveDiceArray', function(ActiveDiceArray){
		this.diceValues = ActiveDiceArray.array;
	}])
	
	.controller("FrozenDiceController", ['FrozenDiceArray', function(FrozenDiceArray){
		this.diceValues = FrozenDiceArray.array;
	}])

	.controller("PlayerNotificationController", ['PlayerNotification', 'FrozenDiceArray', function(PlayerNotification, FrozenDiceArray){
		this.frozenStatus = FrozenDiceArray.frozenStatus;
		this.messageText = PlayerNotification.message;
	}])	
	
	.controller("PlayerOneWormsController", ['PlayerWormsArray', function(PlayerWormsArray){
		this.wormValues = PlayerWormsArray.array;
		this.status = PlayerWormsArray.status;
	}])
	
	.controller("PlayerTwoWormsController", ['PlayerWormsArray', function(PlayerWormsArray){
		this.wormValues = PlayerWormsArray.array;
		this.status = PlayerWormsArray.status;
	}])		
	
	.controller("ActionController", [
		'SetDiceImage', 
		'SetWormImage',
		'CheckValidDiceFreeze', 
		'CheckValidWormTake',
		'ActiveDiceFilter', 
		'ActiveDiceArray', 
		'FrozenDiceArray',
		'GrillWormsArray',		
		'PlayerNotification',
		'PlayerWormsArray',
		'RandomDice',
		'GameAction',
		'$scope',
		function(SetDiceImage, SetWormImage, CheckValidDiceFreeze, CheckValidWormTake, ActiveDiceFilter, ActiveDiceArray, FrozenDiceArray, GrillWormsArray, PlayerNotification, PlayerWormsArray, RandomDice, GameAction, $scope){
			this.activeDice = ActiveDiceArray.array;
			this.frozenDice = FrozenDiceArray.array;
			this.gameStatus = GameAction.status;
			
			this.setPlayers = function(numPlayers){
				GameAction.setStatus('numPlayers', numPlayers);
				GameAction.setStatus('roll', true);
				GameAction.setStatus('gameSetup', false);
			};
			
			this.rollDice = function (){
				if(GameAction.status.roll===true){
					GrillWormsArray.removeWormHighlight();
					RandomDice.roll();
					GameAction.checkMoveAvailable();				
					if(!GameAction.status.bunk){
						PlayerNotification.setMessage('Please click a dice with the number you would like to freeze.');
						GameAction.setStatus('roll', false);
						GameAction.setStatus('takeWorm', false);
						GameAction.setStatus('freezeDice', true);
					}else{
						PlayerNotification.setMessage('You have bunked!  If possible, you lose your newest worm (leftmost) and the highest grill worm is out of the game.');
						GameAction.setStatus('roll', false);
						GameAction.setStatus('takeWorm', false);
						GameAction.setStatus('freezeDice', false);
						GameAction.setStatus('bunk', true);
					}
				}else if(GameAction.status.gameOver===false){
					PlayerNotification.setMessage('You have already rolled, please freeze a dice number group.');
				}
			};
			
			this.freezeDice = function(diceValue){
				if(GameAction.status.freezeDice===true){
					if(CheckValidDiceFreeze.validate(diceValue)){
						ActiveDiceArray.removeHighlight();
						diceImage = SetDiceImage.imagify(diceValue);
						count = ActiveDiceFilter.count(diceValue);
						for(var x=0; x<count; x++){
							FrozenDiceArray.add({value: diceValue, image: diceImage});	
						}
						ActiveDiceArray.remove(diceValue);
						GameAction.setStatus('roll', true);
						GameAction.setStatus('takeWorm', true);
						GameAction.setStatus('freezeDice', false);
						if(FrozenDiceArray.frozenStatus.haveWorm){
							GrillWormsArray.highlightWorms(FrozenDiceArray.frozenStatus.sum);
						}
						PlayerNotification.setMessage('Please click "roll", or click the worm you would like to take.');
					}else{
						PlayerNotification.setMessage('You already froze that number! Please pick a different number.');
					}
				}else if(GameAction.status.gameOver===false){
					PlayerNotification.setMessage('You need to take a worm or reroll the dice.');
				}
			};
			
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
						}else{
							RandomDice.resetDice();
							GameAction.setStatus('roll', true);
							PlayerNotification.setMessage('Please roll the dice.');
						}
					}else{
						PlayerNotification.setMessage('You cannot take that worm tile.');
					}
				}else if(GameAction.status.roll===true){
					PlayerNotification.setMessage('You need to reroll the dice.');
				}
			};
			
			this.bunkPenalty = function(){
				if(PlayerWormsArray.array.length!==0){
					//return worm to grill
					wormValue = PlayerWormsArray.removeBunkWorm();
					//remove highest value worm from grill
					GrillWormsArray.addWorm(wormValue);
					GrillWormsArray.removeBunkWorm(wormValue);
				}
				//reset dice and start over
				RandomDice.resetDice();
				GameAction.setStatus('roll', true);
				GameAction.setStatus('takeWorm', false);
				GameAction.setStatus('freezeDice', false);
				GameAction.setStatus('bunk', false);
				PlayerNotification.setMessage('You can now reroll the dice.');
			};
		}
	]);	
	
})();