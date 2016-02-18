module.exports = /*@ngInject*/ function($scope, $uibModalInstance, authService) {
  $scope.changePassword = function(newPassword) {
    var userData = {
      password: newPassword
    };

    authService.updateUser(userData).then(function(data){
      $uibModalInstance.close(data);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};
