module.exports = function($scope, $uibModalInstance, authService) {
  $scope.profile = {};

  authService.getUser().then(function(data) {
    $scope.profile = _.get(data, 'data', {});
  });

  $scope.updateProfile = function(profileData) {
    authService.updateUser(profileData).then(function(data) {
      console.log("updateUser", data);
      $uibModalInstance.close(data);
    });
  };

  $scope.deleteProfile = function() {
    authService.deleteUser().then(function(data) {
      console.log("deleteUser", data);
      $uibModalInstance.close(data);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};
