angular.module('app')
  .controller('FooterController', function($scope, Auth, CurrentUser) {
    $scope.isCollapsed = true;
    $scope.auth = Auth;
    $scope.user = CurrentUser.user();

    $scope.logout = function() {
      Auth.logout();
    };

    $(document).ready(function() {
      $('.modal').modal({
        dismissible: true
      });
    });
  });
