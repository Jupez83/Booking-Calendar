myApp.controller('loginController', function($scope, $resource, $state) {
  $scope.auth = {};

  $scope.auth.login = function() {
    var loginData = {
      username:$scope.auth.username,
      password:$scope.auth.password,
    };

    console.log('loginData', loginData);
    var req = $resource('auth/login', {}, {post:{method:'POST'}});
    req.post(loginData).$promise.then(function(data) {
      if (data.status === 'OK') {
        $state.go('main');
      } else {
        $('.message').text(data.status);
      }
    });
  };
});
