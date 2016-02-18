module.exports = /*@ngInject*/ function($scope, $uibModalInstance) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};
