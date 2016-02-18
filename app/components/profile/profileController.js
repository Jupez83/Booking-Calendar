module.exports = /*@ngInject*/ function($scope, $uibModalInstance, authService) {
  $scope.profile = {};

  authService.getUser().then(function(data) {
    $scope.profile = _.get(data, 'data', {});
  });

  $scope.updateProfile = function(profileData) {
    authService.updateUser(profileData).then(function(data) {
      console.log("updateUser", data);
      var rsp = {};
      rsp.action = 'put';
      rsp.status = data.status;
      $uibModalInstance.close(rsp);
    });
  };

  $scope.deleteProfile = function() {
    authService.deleteUser().then(function(data) {
      console.log("deleteUser", data);
      var rsp = {};
      rsp.action = 'delete';
      rsp.status = data.status;
      $uibModalInstance.close(rsp);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};
