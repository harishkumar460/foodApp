'use strict';

/**
 * @ngdoc function
 * @name foodApp.controller:MainCtrl
 * @description # MainCtrl Controller of the foodApp
 */
foodApp.controller('loginController', function(loginService, $state,dbService) {
    var self = this;
    self.validCredentials=true;
    self.saveUserDetails = function() {
	loginService.saveUserDetails(self.userRegistration);
	$state.go('login');
    };
    
    self.authenticateUser=function(){
	self.validCredentials=loginService.authenticateUser(self.loginForm);
	if(self.validCredentials){
	    dbService.createUserSession(self.loginForm.userName.$modelValue,self.loginForm.password.$modelValue);
	    $state.go('home');
	}
    };
});