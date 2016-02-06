module.exports = /*@ngInject*/ function($scope, $state, authService) {
  $scope.auth = {};

  $scope.auth.login = function() {
    var loginData = {
      username:$scope.auth.username,
      password:$scope.auth.password,
      remember:$scope.auth.remember,
    };

    console.log('loginData', loginData);

    authService.login(loginData).then(function(data) {
      if (data.status === 'OK') {
        $scope.$parent.makeLogin();
      } else {
        $('.message').text(data.status);
      }
    });
  };

  $scope.auth.register = function() {
    var registerData = {
      username:$scope.auth.username,
      password:$scope.auth.password,
    };

    console.log('registerData', registerData);

    authService.register(registerData).then(function(data) {
      if (data.status === 'OK') {
        $('.message').text('Register successfull. You can now login.');
      } else {
        $('.message').text(data.status);
      }
    });
  };
};
