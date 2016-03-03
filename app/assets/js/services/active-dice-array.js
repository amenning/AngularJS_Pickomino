angular.module('pickominoGame')				

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
}]);