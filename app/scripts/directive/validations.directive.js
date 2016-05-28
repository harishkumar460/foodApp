'use strict';
foodApp.directive('fieldValidation', function() {
    return {
	require : 'ngModel',
	restrict : 'A',
	link : function(scope, element, attrs, ngModelCtrl) {
	    var fieldType = attrs.fieldType;
	     ngModelCtrl.$validators.valid = function(value) {
		switch(fieldType){
		case 'userName':{
		  return (/^[a-zA-Z0-9.]+$/).test(value);  
		}
		case 'userPassword':{
			  return (/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).test(value);  
			}
		}
	    };
	}

    };

});