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
						  { date: "444-44-4444", month: 8, year: 2016, name: "travel" },
						  { date: "555-55-5555", month: 9, year: 2016, name: "food1" },
						  { date: "555-55-5555", month: 9, year: 2016, name: "food2" },
						  { date: "555-55-5555", month: 9, year: 2016, name: "food3" },
						  { date: "555-55-5555", month: 9, year: 2016, name: "food4" },
						  { date: "555-55-5555", month: 9, year: 2016, name: "food5" },
						  { date: "555-55-5555", month: 8, year: 2016, name: "food6" },
						  { date: "555-55-5555", month: 8, year: 2016, name: "food7" },
						];
  
    var request = window.indexedDB.open('myDB', 2);
	request.onupgradeneeded = function(event) {
     var db = event.target.result;

     var objectStore = db.createObjectStore("customers", { keyPath: "date" });

		  objectStore.createIndex("month", "month", { unique: false });
		  
		  objectStore.createIndex("year", "year", { unique: false });

		  objectStore.transaction.oncomplete = function(event) {
		   
		    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
		    for (var i in customerData) {
		      customerObjectStore.add(customerData[i]);
		    }

		    //https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
		    //https://github.com/twinssbc/Ionic-Calendar
		  };


     };					
    };
});