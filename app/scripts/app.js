'use strict';

/**
 * @ngdoc overview
 * @name projectApp
 * @description
 * # projectApp
 *
 * Main module of the application.
 */
var foodApp=angular.module('foodApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngResource',
    'ui.select'
  ]);

foodApp.config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('new_user', {
	url:'/new_user',  
        templateUrl: './scripts/views/user.registration.html',
        controller: 'loginController',
        controllerAs: 'loginCtrl'
      })
      .state('login', {
	url:'/login',  
        templateUrl: './scripts/views/login.html',
        controller: 'loginController',
        controllerAs: 'loginCtrl'
      })
      .state('home', {
	url:'/home',  
        templateUrl: './scripts/views/home.html',
        controller: 'homeController',
        controllerAs: 'homeCtrl'
      })
      .state('menu_item', {
	url:'/menu_item',  
        templateUrl: './scripts/views/menu.item.html',
        controller: 'menuItemController',
        controllerAs: 'menuItemCtrl'
      })
      .state('menu_item_confirm', {
		url:'/menu_item_confirm',  
	        templateUrl: './scripts/views/confirm.menu.item.html',
	        controller: 'menuItemController',
	        controllerAs: 'menuItemCtrl'
	      });
      $urlRouterProvider.otherwise('/login');
  });
