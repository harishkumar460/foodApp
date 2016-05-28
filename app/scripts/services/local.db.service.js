'use strict';
foodApp.service('dbService', function() {
    var self = this;
    self.storeInfo = function(tagId, info,loggedInUser) {
	var key;
	switch (tagId) {
	case 'newUser': {
	    key = info.userName+'user';
	    storeRecord(key, info);
	    break;
	}
	case 'orderDetails': {
	    key = loggedInUser+'_order';
	    storeRecord(key, info);
	    break;
	}
	}
    };
    function storeRecord(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
    }
    self.fetchUser = function(userName) {
	var key=userName+'user';
       return localStorage[key]?JSON.parse(localStorage[key]):'';
    };
    self.createUserSession=function(userName,userPassword){
    sessionStorage.setItem('loggedInUser', JSON.stringify({userName:userName,userPassword:userPassword}));
    };
    self.getLoggedInUser=function(){
    return sessionStorage.getItem('loggedInUser');	
    };
    self.getOrderDetails=function(userName){
	var key=userName+'_order';
	return localStorage[key]?JSON.parse(localStorage[key]):'';
    };
});