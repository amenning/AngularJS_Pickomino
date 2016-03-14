angular.module('pickominoGame')		
	
.controller("LoginController", [
	'GameAction',
	'GameState',
	'$http',
	'$scope',
	function(GameAction, GameState, $http, $scope){
		this.gameStatus = GameAction.status;
		this.formData = {};
		
		this.setUser = function(userID){
			GameAction.setStatus('userID', userID);
			GameAction.setStatus('gameLogin', false);
		};
		
		this.register = function(){
			GameAction.setStatus('gameRegistration', true);
			GameAction.setStatus('gameLogin', false);
		};
		
		this.processForm = function(){
			 $http({
  				method  : 'POST',
  				url     : 'app/assets/php/loginform.inc.php',
  				data    : $.param(this.formData),  // pass in data as strings
  				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 			})
  			.success(function(data) {
    			console.log(data);
				if(data.match===true){
					GameAction.setStatus('gameLogin', false);
				}else{
					
				}
			    //if (!data.success) {
      				// if not successful, bind errors to error variables
      				//$scope.errorName = data.errors.name;
      				//$scope.errorSuperhero = data.errors.superheroAlias;
    			//} else {
      				// if successful, bind success message to message
      				//$scope.message = data.message;
    			//}
  			});
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