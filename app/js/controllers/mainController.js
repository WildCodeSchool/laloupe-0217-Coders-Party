angular.module('app')
    .controller('MainController', function($scope, CurrentUser, UserService) {
      UserService.getOne(CurrentUser.user()._id).then(function(res) {
          $scope.user = res.data;
      });
    });
