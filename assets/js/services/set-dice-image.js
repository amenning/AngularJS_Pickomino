angular.module('pickominoGame')			
		
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
});