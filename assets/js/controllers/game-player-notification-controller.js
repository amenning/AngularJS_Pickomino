angular.module('pickominoGame')

.controller("PlayerNotificationController", ['PlayerNotification', 'FrozenDiceArray', function(PlayerNotification, FrozenDiceArray){
	this.frozenStatus = FrozenDiceArray.frozenStatus;
	this.messageText = PlayerNotification.message;
}]);	