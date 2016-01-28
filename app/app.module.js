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
	

	.factory("ActiveDiceArray", ['$filter', function ActiveDiceFactory($filter, $scope){
		
		var activeDiceArray = [
			{
				value: 1,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			},
			{
				value: 2,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			},
			{
				value: 3,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			},
			{
				value: 4,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			},
			{
				value: 5,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			},
			{
				value: 6,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			},
			{
				value: 7,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			},
			{
				value: 8,
				image: 'assests/img/DiceFaceOne.png',
				canFreeze: true
			}		
		];
		
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
			array: grillWormsArray			
		};
	}])
	
	
	.factory("FrozenDiceArray", [function FrozenDiceFactory(){
		
		var frozenDiceArray = [];
		
		return {
			array: frozenDiceArray,
		
			add: function(dice){
				frozenDiceArray.push(dice);
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
	
	.controller("GrillWormsController", ['GrillWormsArray', function(GrillWormsArray){
		this.grillWormsValues = GrillWormsArray.array;
	}])	
	
	.controller("ActiveDiceController", ['ActiveDiceArray', function(ActiveDiceArray){
		this.diceValues = ActiveDiceArray.array;
	}])
	
	.controller("FrozenDiceController", ['FrozenDiceArray', function(FrozenDiceArray){
		this.diceValues = FrozenDiceArray.array;
	}])

	.controller("PlayerNotificationController", ['PlayerNotification', function(PlayerNotification){
		this.messageText = PlayerNotification.message;
	}])	
	
	.controller("RollDiceController", [
		'SetDiceImage', 
		'CheckValidDiceFreeze', 
		'ActiveDiceFilter', 
		'ActiveDiceArray', 
		'FrozenDiceArray', 
		'PlayerNotification',
		'$scope',
		function(SetDiceImage, CheckValidDiceFreeze, ActiveDiceFilter, ActiveDiceArray, FrozenDiceArray, PlayerNotification, $scope){
			this.activeDice = ActiveDiceArray.array;
			this.frozenDice = FrozenDiceArray.array;
			
			this.rollDice = function (){
				for(var x=0; x<this.activeDice.length; x++){
					// Returns a random integer between min (included) and max (excluded)
					// Using Math.round() will give you a non-uniform distribution!
					this.activeDice[x].value=Math.floor(Math.random() * (7 - 1)) + 1;
					this.activeDice[x].image=SetDiceImage.imagify(this.activeDice[x].value);
				}
				PlayerNotification.setMessage('Please click a dice with the number you would like to freeze.');
			};
			
			this.freezeDice = function(diceValue){
				if(CheckValidDiceFreeze.validate(diceValue)){
					diceImage = SetDiceImage.imagify(diceValue);
					count = ActiveDiceFilter.count(diceValue);
					for(var x=0; x<count; x++){
						FrozenDiceArray.add({value: diceValue, image: diceImage});	
					}
					ActiveDiceArray.remove(diceValue);
					PlayerNotification.setMessage('Please click "roll" to roll the dice.');
				}else{
					PlayerNotification.setMessage('You already froze that number!');
				}
			}
		}
	]);	

//	var playerNotification = 'Please click "roll" to roll the dice.';
	
})();