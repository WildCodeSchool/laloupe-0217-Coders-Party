angular.module('app')
    .controller('ProfileController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
