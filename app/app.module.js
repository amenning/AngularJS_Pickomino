(function(){
	angular.module('pickominoGame', [])
	
	.controller("GrillWormsController", function(){
		this.grillWormsValues = grillWormValues;
	})	
	
	.controller("ActiveDiceController", function(){
		this.diceValues = activeDiceValues;
	})
	
	.controller("FrozenDiceController", function(){
		this.diceValues = frozenDiceValues;
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
		}
	})
	
	.factory("CheckValidDiceFreeze", ['$filter', function CheckValidDiceFreezeFactory($filter){
		return {
			validate: function(freezeValue){
				var found = $filter('filter')(frozenDiceValues, {value: freezeValue}, true);
				return (found.length===0);				
			}
		}
	}])
	
	.controller("RollDiceController", ['SetDiceImage', 'CheckValidDiceFreeze', function(SetDiceImage, CheckValidDiceFreeze){
		this.activeDice = activeDiceValues;
		this.frozenDice = frozenDiceValues;
		
		this.rollDice = function (){
			for(var x=0; x<this.activeDice.length; x++){
				// Returns a random integer between min (included) and max (excluded)
				// Using Math.round() will give you a non-uniform distribution!
				this.activeDice[x].value=Math.floor(Math.random() * (7 - 1)) + 1;
				this.activeDice[x].image=SetDiceImage.imagify(this.activeDice[x].value);
			}
		};
		
		this.rollDice();
		
		this.freezeDice = function(diceValue){
			if(CheckValidDiceFreeze.validate(diceValue)){
				diceImage = SetDiceImage.imagify(diceValue);
				this.frozenDice.push({value: diceValue, image: diceImage});
			}else{
				playerNotification = 'You already froze that number!';
				console.log(playerNotification);
			}
		}
	}]);	

	var playerNotification = '';
	
	var grillWormValues = [
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
	
	var activeDiceValues = [
		{
			value: 1,
			image: 'assests/img/DiceFaceOne.png'
		},
		{
			value: 2,
			image: 'assests/img/DiceFaceOne.png'
		},
		{
			value: 3,
			image: 'assests/img/DiceFaceOne.png'
		},
		{
			value: 4,
			image: 'assests/img/DiceFaceOne.png'
		},
		{
			value: 5,
			image: 'assests/img/DiceFaceOne.png'
		},
		{
			value: 6,
			image: 'assests/img/DiceFaceOne.png'
		},
		{
			value: 7,
			image: 'assests/img/DiceFaceOne.png'
		},
		{
			value: 8,
			image: 'assests/img/DiceFaceOne.png'
		}		
	];
	
	var frozenDiceValues = [
		{
			value: 3,
			image: 'assests/img/DiceFaceThree.png'
		}		
	];	
})();