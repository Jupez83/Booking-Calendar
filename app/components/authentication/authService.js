module.exports = function($resource) {
  var factory = {};

  factory.loggedIn = false;

  factory.isLoggedIn = function() {
    var req = $resource('/auth/status', {});
    return req.get().$promise;
  };

  factory.register = function(registerData) {
    var req = $resource('/auth/register', {}, {'post': {method:'POST'}});
    return req.post(registerData).$promise;
  };

  factory.login = function(loginData) {
    var req = $resource('/auth/login', {}, {'post': {method:'POST'}});
    return req.post(loginData).$promise;
  };

  factory.getUser = function() {
    var req = $resource('/user', {});
    return req.get().$promise;
  };

  factory.updateUser = function(userData) {
    var req = $resource('/user', {}, {'put':{method:'PUT'}});
    return req.put(userData).$promise;
  };

  factory.deleteUser = function() {
    var req = $resource('/user', {}, {'delete':{method:'DELETE'}});
    return req.delete().$promise;
  };

  return factory;
};
