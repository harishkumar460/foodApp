'use strict';
var expect=chai.expect;
var assert=chai.assert;
describe('Controller: loginController', function () {

  // load the controller's module
  beforeEach(module('foodApp'));

  var self,scope,mockLoginService,mockdbService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    self = $controller('loginController', {
      $scope: scope,
      loginService:mockLoginService,
      dbService:mockdbService
      // place here mocked dependencies
    });
  }));
  var userInfo='';
  mockLoginService={
	  saveUserDetails:function(){
	    userInfo={userName:self.userRegistration.userName,password:self.userRegistration.password};  
	  },
	  authenticateUser:function(){
	   return (self.loginForm.userName.$modelValue===userInfo.userName&&self.loginForm.password.$modelValue===userInfo.password);   
	  }
  };
  mockdbService={
	  createUserSession:function(){}  
  };
  it('should test saveUserDetails', function () {
      self.userRegistration={userName:'test',password:'test@123'};
      self.saveUserDetails();
      expect(userInfo.userName).to.equal(self.userRegistration.userName);
  });
  it('should test authenticateUser valid case', function () {
      self.loginForm={userName:{$modelValue:'test'},password:{$modelValue:'test@123'}};
      self.authenticateUser();
      expect(self.validCredentials).to.equal(true);
  });
  it('should test authenticateUser invalid case', function () {
      self.loginForm={userName:{$modelValue:'tesdf'},password:{$modelValue:'test@123'}};
      self.authenticateUser();
      expect(self.validCredentials).to.equal(false);
  });
});
