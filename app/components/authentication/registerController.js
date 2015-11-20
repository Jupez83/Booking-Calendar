myApp.controller('registerController', function($scope, $resource) {
  $scope.auth = {};

  $scope.auth.register = function() {
    var registerData = {
      username:$scope.auth.username,
      password:$scope.auth.password,
    };
    console.log('registerData', registerData);
    var req = $resource('auth/register', {}, {post:{method:'POST'}});
    req.post(registerData).$promise.then(function(data) {
      if (data.status === 'OK') {
        $('.message').text('Register successfull. You can now login.');
      } else {
        $('.message').text(data.status);
      }
    });
  };
});
