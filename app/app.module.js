(function(){
	angular.module('pickominoGame', [])
	
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
		}
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
	
	
	.factory("GrillWormsArray", [function GrillWromsFactory(){
		var grillWormsArray = [
			{
				value: 21,
				image: 'assests/img/OneWormTile.png'
			},
			{
				value: 22,
				image: 'assests/img/OneWormTile.png'
			},
			{
				value: 23,
				image: 'assests/img/OneWormTile.png'
			},
			{
				value: 24,
				image: 'assests/img/OneWormTile.png'
			},
			{
				value: 25,
				image: 'assests/img/TwoWormTile.png'
			},
			{
				value: 26,
				image: 'assests/img/TwoWormTile.png'
			},
			{
				value: 27,
				image: 'assests/img/TwoWormTile.png'
			},
			{
				value: 28,
				image: 'assests/img/TwoWormTile.png'
			},
			{
				value: 29,
				image: 'assests/img/ThreeWormTile.png'
			},
			{
				value: 30,
				image: 'assests/img/ThreeWormTile.png'
			},
			{
				value: 31,
				image: 'assests/img/ThreeWormTile.png'
			},
			{
				value: 32,
				image: 'assests/img/ThreeWormTile.png'
			},
			{
				value: 33,
				image: 'assests/img/FourWormTile.png'
			},
			{
				value: 34,
				image: 'assests/img/FourWormTile.png'
			},
			{
				value: 35,
				image: 'assests/img/FourWormTile.png'
			},
			{
				value: 36,
				image: 'assests/img/FourWormTile.png'
			}
		];
		
		return {
			array: grillWormsArray,

			removeWorm: function(wormValue){	
				for(var x=grillWormsArray.length-1; x>=0; x--){
					if(grillWormsArray[x].value === wormValue){
						grillWormsArray.splice(x, 1);
					}
				}
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
				frozenDiceStatus.sum += dice.value;
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
	
	.factory("PlayerWormsArray", [function PlayerWromsFactory(){
		var playerWormsArray = [ ];
		
		return {
			array: playerWormsArray,

			addWorm: function(wormObject){	
				playerWormsArray.push(wormObject);
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
			}
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
			}
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
			}
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
			}
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
		function(SetDiceImage, CheckValidDiceFreeze, CheckValidWormTake, ActiveDiceFilter, ActiveDiceArray, FrozenDiceArray, GrillWormsArray, PlayerNotification, PlayerWormsArray, RandomDice, GameAction, $scope){
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
			}
			
			this.takeWorm = function(wormValue){				
				if(GameAction.status.takeWorm===true){
					if(CheckValidWormTake.validate(wormValue)){
						GrillWormsArray.removeWorm(wormValue);
						RandomDice.resetDice();
						GameAction.setStatus('roll', true);
						GameAction.setStatus('takeWorm', false);
						GameAction.setStatus('freezeDice', false);
						PlayerWormsArray.addWorm({value: wormValue, image: 'assests/img/FourWormTile.png'});
					}else{
						PlayerNotification.setMessage('You cannot take that worm tile.');
					}
				}else{
					PlayerNotification.setMessage('You need to reroll the dice.');
				}
			}
		}
	]);	
	
})();