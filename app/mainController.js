module.exports = function($rootScope, $scope, $state, authService) {
  $rootScope.loginData = {};
  
  authService.isLoggedIn().then(function(data) {
    $rootScope.loginData.loggedIn = data.authoricated;

    /* Forward to the calendar page if user has been logged in */
    if (data.authoricated) {
      $state.go('calendar');
    }
  });

  $scope.isActive = function(page) {
    return page === $state.current.name;
  };
};
