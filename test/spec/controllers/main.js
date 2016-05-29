'use strict';
var expect=mocha.expect;
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
  mockLoginService={
	  saveUserDetails:function(){},
	  authenticateUser:function(){}
  };
  mockdbService={
	  createUserSession:function(){}  
  };
  it('should attach a list of awesomeThings to the scope', function () {
    expect(typeof self).toBe('object');
  });
});
