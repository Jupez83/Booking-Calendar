window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('moment');
require('fullcalendar');

require('angular');
require('angular-resource');
require('angular-ui-router');

var myApp = angular.module('root_module', ['ui.router', 'ngResource']);

myApp.factory('authService', require('./components/authentication/authService.js'));
myApp.controller('authController', require('./components/authentication/authController.js'));

var isLoggedIn = function($q, authService) {
  var deferred = $q.defer();

  authService.isLoggedIn().then(function(data) {
    if (data.authoricated) {
      deferred.resolve();
    } else {
      deferred.reject();
    }
  });

  return deferred.promise;
};

myApp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/login');

  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'components/authentication/login.html',
      controller: 'authController',
    })
    .state('register', {
      url: '/register',
      templateUrl: 'components/authentication/register.html',
      controller: 'authController',
    })
    .state('main', {
      url: '/main',
      templateUrl: 'components/main.html',
      //controller: 'mainController',
      resolve: {loggedIn: isLoggedIn},
    });
});

myApp.run(function() {
  //console.log("run");
});
