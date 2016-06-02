'use strict';
var expect=chai.expect;
var assert=chai.assert;
describe('Login service test case run',function(){
	var loginService;
	beforeEach(module('foodApp'));
	beforeEach(inject(function(_loginService_){
	loginService=_loginService_;	
	}));
	it('should test saveUserDetails function as expected',function(){
		var formObj={firstName:{$modelValue:'test'},
					 lastName:{$modelValue:'test1'},
					 userRegName:{$modelValue:'test_1'},
					 userRegPassword:{$modelValue:'test@123'}};
		loginService.saveUserDetails(formObj);
		var loginUserInput={userName:{$modelValue:'test_1'},
					 password:{$modelValue:'test@123'}};
		var authenticated=loginService.authenticateUser(loginUserInput);
		expect(authenticated).to.equal(true);
	});
	it('should test authenticateUser function as expected true case',function(){
		var formObj={userName:{$modelValue:'test_1'},
					 password:{$modelValue:'test@123'}};
		var authenticated=loginService.authenticateUser(formObj);
		expect(authenticated).to.equal(true);
	});
	it('should test authenticateUser function as expected false case',function(){
		var formObj={userName:{$modelValue:'te'},
					 password:{$modelValue:'test123'}};
		var authenticated=loginService.authenticateUser(formObj);
		expect(authenticated).to.equal(false);
	});
});