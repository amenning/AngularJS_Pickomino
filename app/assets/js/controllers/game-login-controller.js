angular.module('pickominoGame')		
	
.controller("LoginController", [
	'GameAction',
	'GameState',
	'$http',
	function(GameAction, GameState, $http){
		this.gameStatus = GameAction.status;
		
		this.setUser = function(userID){
			GameAction.setStatus('userID', userID);
			GameAction.setStatus('gameLogin', false);
		};
		
		this.register = function(){
			GameAction.setStatus('gameRegistration', true);
			GameAction.setStatus('gameLogin', false);
		};
		
		this.guestLogin = function(){
				var randomPassword = "Guest" + Math.floor((Math.random() * 99999) + 1);
				newGuest = {
					'firstname': "Guest",
					'lastname': "",
					'username': "Guest" + Math.floor((Math.random() * 99999) + 1),
					'password': randomPassword,
					'password_check': randomPassword,
					'email': 'guest@guest.com'					
				};
								
				$http.post("app/assets/php/guest_registration.php", newGuest)
				.success(function(data){
					GameAction.setStatus('gameLogin', false);
				});
		};
	}
]);	