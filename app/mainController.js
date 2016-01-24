module.exports = function($rootScope, $scope, $state, $stateParams, $q, authService, calendarService) {
  $rootScope.loginData = {};
  $scope.calendars = [];

  authService.isLoggedIn().then(function(data) {
    $rootScope.loginData.loggedIn = data.authoricated;

    /* Forward to the calendar page if user has been logged in */
    if (data.authoricated) {
      $scope.makeLogin();
    }
  });

  $scope.makeLogin = function() {
    updateCalendarList().then(function(data) {
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

  $scope.$on('calendarListChanged', function() {
    console.log('calendarListChanged');
    updateCalendarList().then(function() {
      if (_.isEmpty($scope.calendars)) {
        $state.go('newCalendar');
      } else {
        if (!_.some($scope.calendars, ['_id', $stateParams.calendarId])) {
          $state.go('calendar', {calendarId: $scope.calendars[0]._id});
        }
      }
    });
  });
};
