'use strict';

/**
 * @ngdoc function
 * @name foodApp.controller:MainCtrl
 * @description # MainCtrl Controller of the foodApp
 */
foodApp.controller('loginController', function(loginService, $state,dbService) {
    var self = this;
    self.saveUserDetails = function() {
	loginService.saveUserDetails(self.userRegistration);
	$state.go('login');
    };
    
    self.authenticateUser=function(){
	self.invalidCredentials=loginService.authenticateUser(self.loginForm);
	if(!self.invalidCredentials){
	    dbService.createUserSession(self.loginForm.userName.$modelValue,self.loginForm.password.$modelValue);
	    $state.go('home');
	}
    };
});