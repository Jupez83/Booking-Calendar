module.exports = /*@ngInject*/ function($rootScope, $scope, $state, $q, $uibModal, authService, calendarService) {
  $rootScope.loginData = {};
  $scope.calendars = [];
  $scope.username = 'User';

  authService.isLoggedIn().then(function(data) {
    $rootScope.loginData.loggedIn = data.authoricated;

    /* Forward to the calendar page if user has been logged in */
    if (data.authoricated) {
      $scope.makeLogin();
    }
  });

  $scope.makeLogin = function() {
    authService.getUser().then(function(userData) {
      $scope.username = userData.data.username;
    });

    updateCalendarList().then(function() {
      if (_.isEmpty($scope.calendars)) {
        $state.go('newCalendar');
      } else {
        $state.go('calendar', {calendarId: $scope.calendars[0]._id});
      }
    });
  };

  $scope.isActive = function(page) {
    return page === $state.current.name;
  };

  $scope.openPasswordDialog = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'components/authentication/passwordDialog.html',
      controller: 'passwordController',
    });

    modalInstance.result.then(function(data) {
      if (data.status === 'OK') {
        $scope.$broadcast('alertSuccessMsg', 'Password changed successfully!');
      } else {
        $scope.$broadcast('alertDangerMsg', 'Unexpected error occurred during changing password!');
      }
    });
  };

  $scope.openProfileDialog = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'components/profile/profileDialog.html',
      controller: 'profileController',
    });

    modalInstance.result.then(function(data) {
      switch(data.action) {
        case 'put':
          if (data.status === 'OK') {
            $scope.$broadcast('alertSuccessMsg', 'Profile updated successfully!');
          } else {
            $scope.$broadcast('alertDangerMsg', 'Unexpected error occurred during updating profile!');
          }
          break;
        case 'delete':
          if (data.status === 'OK') {
            $scope.$broadcast('alertSuccessMsg', 'Profile deleted successfully!');
          } else {
            $scope.$broadcast('alertDangerMsg', 'Unexpected error occurred during deleting profile!');
          }
          break;
      }
    });
  };

  $scope.openAboutDialog = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'components/about/aboutDialog.html',
      controller: 'aboutController',
    });
  };

  function updateCalendarList() {
    var deferred = $q.defer();

    calendarService.getAllCalendars().then(function(data) {
      if (_.has(data, 'data')) {
        deferred.resolve();
        $scope.calendars = data.data;
      } else {
        deferred.reject();
      }
    });

    return deferred.promise;
  }

  $scope.$on('calendarListChanged', function(event, data) {
    console.log('calendarListChanged');
    updateCalendarList().then(function() {
      if (_.isEmpty($scope.calendars)) {
        $state.go('newCalendar');
      } else {
        if (!_.some($scope.calendars, ['_id', data.calendarId])) {
          $state.go('calendar', {calendarId: $scope.calendars[0]._id});
        }
      }
    });
  });
};
