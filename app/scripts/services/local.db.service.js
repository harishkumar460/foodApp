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

    self.openIndexDB=function(){
    self.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
     var customerData = [
						  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
						  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
						];
  
    var request = window.indexedDB.open('myDB', 2);
	request.onupgradeneeded = function(event) {
     var db = event.target.result;

     var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

		  objectStore.createIndex("name", "name", { unique: false });
		  
		  objectStore.createIndex("email", "email", { unique: true });

		  objectStore.transaction.oncomplete = function(event) {
		   
		    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
		    for (var i in customerData) {
		      customerObjectStore.add(customerData[i]);
		    }
		  };


     };					
    };
});