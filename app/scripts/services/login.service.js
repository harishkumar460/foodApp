'use strict';
foodApp.service('loginService', function(dbService) {
    var self = this;
    self.saveUserDetails = function(formObj) {
	var newUser = createUserInfoSet(formObj);
	dbService.storeInfo('newUser', newUser);
    };
    function createUserInfoSet(formObj) {
	return {
	    firstName : formObj.firstName.$modelValue,
	    lastName : formObj.lastName.$modelValue,
	    userName : formObj.userRegName.$modelValue,
	    password : formObj.userRegPassword.$modelValue
	};
    }
    
    self.authenticateUser=function(userInput){
	var userInfo=dbService.fetchUser(userInput.userName.$modelValue);
	if(userInfo){
	  return (userInput.userName.$modelValue===userInfo.userName&&userInput.password.$modelValue===userInfo.password);   
	}else{
	  return false;  
	}
    };
});