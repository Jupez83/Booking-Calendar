module.exports = function($scope, authService) {
  $scope.profile = {};

  authService.getUser().then(function(data) {
    console.log("Profile", data);
    $scope.profile = _.get(data, 'data', {});
  });

  $scope.updateProfile = function(profileData) {
    authService.updateUser(profileData).then(function(data) {
      console.log("updateUser", data);
    });
  };

  $scope.deleteProfile = function() {
    authService.deleteUser().then(function(data) {
      console.log("deleteUser", data);
    });
  };
};
