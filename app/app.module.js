(function(){
	angular.module('pickominoGame', [])
	
	.directive("commonHeader", function() {
		return {
			restrict: 'E',
			templateUrl: "common-header.html"
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
						return 'assests/img/DiceFaceOne.png';
						break;
					case 2:
						return 'assests/img/DiceFaceTwo.png';
						break;
					case 3:
						return 'assests/img/DiceFaceThree.png';
						break;
					case 4:
						return 'assests/img/DiceFaceFour.png';
						break;
					case 5:
						return 'assests/img/DiceFaceFive.png';
						break;
					case 6:
						return 'assests/img/OneWormTile.png';
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
						return 'assests/img/OneWormTile.png';
						break;
					case 25:
					case 26:
					case 27:
					case 28:
						return 'assests/img/TwoWormTile.png';
						break;
					case 29:
					case 30:
					case 31:
					case 32:
						return 'assests/img/ThreeWormTile.png';
						break;
					case 33:
					case 34:
					case 35:
					case 36:
						return 'assests/img/FourWormTile.png';
						break;
				};
			}
		};
	})	
	

	.factory("ActiveDiceArray", ['$filter', 'SetDiceImage', function ActiveDiceFactory($filter, SetDiceImage, $scope){
		
		var activeDiceArray = [ ];
		
		for(var x=0, diceValue, diceImage; x<8; x++){
			diceValue=1;
			diceImage=SetDiceImage.imagify(diceValue);
			activeDiceArray.push({value: diceValue, image: diceImage, canFreeze: true});
		}
		
		return {
			array: activeDiceArray,
			
			remove: function(diceValue){	
				for(var x=activeDiceArray.length-1; x>=0; x--){
					if(activeDiceArray[x].value === diceValue){
						activeDiceArray.splice(x, 1);
					}
				}
			}
		};
	}])
	
	
	.factory("GrillWormsArray", ['SetWormImage', function GrillWromsFactory(SetWormImage){

		var grillWormsArray = [ ];
		
		for(var x=21, wormValue, wormImage; x<=36; x++){
			wormValue=x;
			wormImage=SetWormImage.imagify(wormValue);
			grillWormsArray.push({value: wormValue, image: wormImage, canTake: false});
		}

		
		return {
			array: grillWormsArray,

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
			
			removeBunkWorm: function(){
				grillWormsArray.pop();
			}
		};
	}])
	
	
	.factory("FrozenDiceArray", [function FrozenDiceFactory(){
		
		var frozenDiceArray = [];
		
		var frozenDiceStatus = {sum: 0};
		
		return {
			array: frozenDiceArray,
		
			add: function(dice){
				frozenDiceArray.push(dice);
				if(dice.value<=5){
					frozenDiceStatus.sum += dice.value;
				}else{
					frozenDiceStatus.sum += 5;
				}
				
			},
			
			emptyDice: function(){
				for(var i=frozenDiceArray.length; i>0; i--){
					frozenDiceArray.pop();
				};
				frozenDiceStatus.sum = 0;
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
				roll: true,
				freezeDice: false,
				takeWorm: false,
				bunk: false
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
		
		var playerMessage = {info : 'Please click "roll" to roll the dice.'};
		
		return {
			message: playerMessage,
			
			setMessage: function(textMessage){
				playerMessage.info = textMessage;
			}
		
		};
	}])	
	
	.factory("PlayerWormsArray", ['SetWormImage', function PlayerWromsFactory(SetWormImage){
		var playerWormsArray = [ ];
		
		return {
			array: playerWormsArray,

			addWorm: function(wormValue){	
				wormImage = SetWormImage.imagify(wormValue);
				playerWormsArray.push({value: wormValue, image: wormImage});
			},
			
			removeBunkWorm: function(){
				var wormValue = playerWormsArray[0].value;
				playerWormsArray.shift();
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
									diceValue=Math.floor(Math.random() * (7 - 1)) + 1;
									diceImage=SetDiceImage.imagify(diceValue);
									ActiveDiceArray.array.push({value: diceValue, image: diceImage, canFreeze: true});
								}
								FrozenDiceArray.emptyDice();
							}						
			};
		}
	])	
	
	.controller("GrillWormsController", ['GrillWormsArray', function(GrillWormsArray){
		this.grillWormsValues = GrillWormsArray.array;
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
	
	.controller("PlayerWormsController", ['PlayerWormsArray', function(PlayerWormsArray){
		this.wormValues = PlayerWormsArray.array;
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
			
			this.rollDice = function (){
				if(GameAction.status.roll===true){
/* 					for(var x=0; x<this.activeDice.length; x++){
						// Returns a random integer between min (included) and max (excluded)
						// Using Math.round() will give you a non-uniform distribution!
						this.activeDice[x].value=Math.floor(Math.random() * (7 - 1)) + 1;
						this.activeDice[x].image=SetDiceImage.imagify(this.activeDice[x].value);
					} */
					RandomDice.roll();
					GameAction.checkMoveAvailable();
					if(!GameAction.status.bunk){
						PlayerNotification.setMessage('Please click a dice with the number you would like to freeze.');
						GameAction.setStatus('roll', false);
						GameAction.setStatus('takeWorm', true);
						GameAction.setStatus('freezeDice', true);
					}else{
						PlayerNotification.setMessage('You have bunked!');
						GameAction.setStatus('roll', false);
						GameAction.setStatus('takeWorm', false);
						GameAction.setStatus('freezeDice', false);
						alert('You have bunked.  If possible, you lose a worm and the highest grill worm is out of the game.');
						this.bunkPenalty();
					}
				}else{
					PlayerNotification.setMessage('You have already rolled, please freeze a dice number group or take a worm, if possible.');
				}
			};
			
			this.freezeDice = function(diceValue){
				if(GameAction.status.freezeDice===true){
					if(CheckValidDiceFreeze.validate(diceValue)){
						diceImage = SetDiceImage.imagify(diceValue);
						count = ActiveDiceFilter.count(diceValue);
						for(var x=0; x<count; x++){
							FrozenDiceArray.add({value: diceValue, image: diceImage});	
						}
						ActiveDiceArray.remove(diceValue);
						GameAction.setStatus('roll', true);
						GameAction.setStatus('takeWorm', true);
						GameAction.setStatus('freezeDice', false);
						PlayerNotification.setMessage('Please click "roll" to roll the dice or the worm you would like to take.');
					}else{
						PlayerNotification.setMessage('You already froze that number! Please pick a different number.');
					}
				}else{
					PlayerNotification.setMessage('You need to take a worm or reroll the dice.');
				}
			};
			
			this.takeWorm = function(wormValue){				
				if(GameAction.status.takeWorm===true){
					if(CheckValidWormTake.validate(wormValue)){
						GrillWormsArray.removeWorm(wormValue);
						RandomDice.resetDice();
						GameAction.setStatus('roll', true);
						GameAction.setStatus('takeWorm', false);
						GameAction.setStatus('freezeDice', false);
						PlayerWormsArray.addWorm(wormValue);
					}else{
						PlayerNotification.setMessage('You cannot take that worm tile.');
					}
				}else{
					PlayerNotification.setMessage('You need to reroll the dice.');
				}
			};
			
			this.bunkPenalty = function(){
				if(PlayerWormsArray.array.length!==0){
					//return worm to grill
					wormValue = PlayerWormsArray.removeBunkWorm();
					//remove highest value worm from grill
					GrillWormsArray.addWorm(wormValue);
					GrillWormsArray.removeBunkWorm();
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