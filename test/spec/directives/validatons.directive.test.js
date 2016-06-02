'use strict';
var expect=chai.expect;
var assert=chai.assert;
describe('Field Validation directive test case run',function(){
	var $scope,$compile,$rootScope,$controller;
	var htmlUserName='<form name="userInfo"><input name="userRegName" type="text" field-validation field-type="userName" ng-model="userRegName" required /></form>';
	var htmlPassword='<form name="userInfo"><input name="userRegPassword" type="password" field-validation field-type="userPassword" ng-model="userRegPassword" required /></form>';
	beforeEach(module('foodApp'));
	beforeEach(inject(function($injector){
	$rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
	$controller=$injector.get('$controller');
	}));
	it('should test as expected',function(){
	   var element = $compile(htmlUserName)($rootScope);
       $scope.$digest();
       expect(angular.isDefined(element)).to.equal(true);
	});
	it('should test as expected invalid user name',function(){
	   var element = $compile(htmlUserName)($rootScope);
       $scope.$digest();
	   $scope.userInfo.userRegName.$setViewValue('@s%sds');
	   $scope.$digest();
	  expect($scope.userInfo.$valid).to.equal(false);
	});
	it('should test as expected valid user name',function(){
	   var element = $compile(htmlUserName)($rootScope);
       $scope.$digest();
	   $scope.userInfo.userRegName.$setViewValue('test1');
	   $scope.$digest();
	  expect($scope.userInfo.$valid).to.equal(true);
	});
	it('should test as expected invalid password',function(){
	   var element = $compile(htmlPassword)($rootScope);
       $scope.$digest();
	   $scope.userInfo.userRegPassword.$setViewValue('test123');
	   $scope.$digest();
	  expect($scope.userInfo.$valid).to.equal(false);
	});
	it('should test as expected valid password',function(){
	   var element = $compile(htmlPassword)($rootScope);
       $scope.$digest();
	   $scope.userInfo.userRegPassword.$setViewValue('test@123');
	   $scope.$digest();
	  expect($scope.userInfo.$valid).to.equal(true);
	});
});