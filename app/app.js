var myApp = angular.module('root_module', ['ui.router', 'ngResource']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/login');

  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'components/authentication/login.html',
      controller: 'loginController',
    })
    .state('register', {
      url: '/register',
      templateUrl: 'components/authentication/register.html',
      controller: 'registerController',
    })
    .state('main', {
      url: '/main',
      templateUrl: 'components/main.html',
    });
});
