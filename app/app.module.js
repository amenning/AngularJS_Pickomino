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
	
	
	.controller("RollDiceController", function(){
		this.activeDice = activeDiceValues;
		this.frozenDice = frozenDiceValues;
		
		this.rollDice = function (){
			for(var x=0; x<this.activeDice.length; x++){
				// Returns a random integer between min (included) and max (excluded)
				// Using Math.round() will give you a non-uniform distribution!
				this.activeDice[x].value=Math.floor(Math.random() * (7 - 1)) + 1;
			}
		};
		
		this.freezeDice = function(diceValue){
			console.log(diceValue);
			this.frozenDice.push(diceValue);
		}
	});	

	var grillWormValues = [
		21,
		22,
		23,
		24,
		25,
		26,
		27,
		28,
		29,
		30,
		31,
		32,
		33,
		34,
		35,
		36
	];
	
	var activeDiceValues = [
		{
			value: 1,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 2,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 3,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 4,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 5,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 6,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 7,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 8,
			image: '../assests/img/DiceFaceOne.png'
		},
		{
			value: 1,
			image: '../assests/img/DiceFaceOne.png'
		}		
	];
	
	var frozenDiceValues = [
		{
			value: 1,
			image: '../assests/img/DiceFaceOne.png'
		}		
	];	
})();