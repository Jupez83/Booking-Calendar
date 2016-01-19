window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('moment');
require('fullcalendar');

require('angular');
require('angular-resource');
require('angular-ui-router');

var myApp = angular.module('root_module', ['ui.router', 'ngResource']);

myApp.factory('authService', require('./components/authentication/authService.js'));
myApp.controller('mainController', require('./mainController.js'));
myApp.controller('authController', require('./components/authentication/authController.js'));
myApp.factory('calendarService', require('./components/calendar/calendarService.js'));
myApp.controller('calendarController', require('./components/calendar/calendarController.js'));
myApp.controller('testController', require('./components/testController.js'));

var isLoggedIn = function($rootScope, $q, authService) {
  var deferred = $q.defer();

  authService.isLoggedIn().then(function(data) {
    $rootScope.loginData.loggedIn = data.authoricated;

    if (data.authoricated) {
      deferred.resolve();
    } else {
      deferred.reject();
    }
  });

  return deferred.promise;
};

myApp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /login
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
    .state('calendar', {
      url: '/calendar',
      templateUrl: 'components/calendar/calendar.html',
      controller: 'calendarController',
      resolve: {loggedIn: isLoggedIn},
    })
    .state('settings', {
      url: '/settings',
      //templateUrl: 'components/calendar/calendar.html',
      //controller: 'calendarController',
      resolve: {loggedIn: isLoggedIn},
    })
    .state('profile', {
      url: '/profile',
      //templateUrl: 'components/calendar/calendar.html',
      //controller: 'calendarController',
      resolve: {loggedIn: isLoggedIn},
    })
    .state('test', {
      url: '/test',
      templateUrl: 'components/test.html',
      controller: 'testController',
      resolve: {loggedIn: isLoggedIn},
    });
});

myApp.run(function() {
  //console.log("run");
});
