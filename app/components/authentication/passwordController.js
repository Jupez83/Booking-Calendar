module.exports = /*@ngInject*/ function($scope, $uibModalInstance) {
  $scope.password = {};

  $scope.ok = function(data) {
    $uibModalInstance.close(data);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};
