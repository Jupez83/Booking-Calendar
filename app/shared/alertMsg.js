module.exports = function() {
  return {
    template: '<uib-alert dismiss-on-timeout="5000" ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</uib-alert>',
    restrict: 'E',
    replace: true,
    link: function postLink(scope, element, attrs) {
      var msg = null;

      scope.$on('alertSuccessMsg', function(event, data) {
        msg = {};
        msg.type = 'success';
        msg.msg = data;
        scope.alerts.push(msg);
      });

      scope.$on('alertWarningMsg', function(event, data) {
        msg = {};
        msg.type = 'warning';
        msg.msg = data;
        scope.alerts.push(msg);
      });

      scope.$on('alertInfoMsg', function(event, data) {
        msg = {};
        msg.type = 'info';
        msg.msg = data;
        scope.alerts.push(msg);
      });

      scope.$on('alertDangerMsg', function(event, data) {
        msg = {};
        msg.type = 'danger';
        msg.msg = data;
        scope.alerts.push(msg);
      });

    },
    controller: function($scope) {
      $scope.alerts = [];
      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
    }
  };
};
