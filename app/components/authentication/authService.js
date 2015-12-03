myApp.factory('authService', function($resource) {
  var factory = {};

  factory.loggedIn = false;

  factory.isLoggedIn = function() {
    var req = $resource('auth/status', {}, {get: {method:'GET'}});
    return req.get().$promise;
  };

  factory.register = function(registerData) {
    var req = $resource('auth/register', {}, {post: {method:'POST'}});
    return req.post(registerData).$promise;
  };

  factory.login = function(loginData) {
    var req = $resource('auth/login', {}, {post: {method:'POST'}});
    return req.post(loginData).$promise;
  };

  return factory;
});
