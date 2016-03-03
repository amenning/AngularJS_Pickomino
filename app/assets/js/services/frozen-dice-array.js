angular.module('pickominoGame')				

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
}]);	