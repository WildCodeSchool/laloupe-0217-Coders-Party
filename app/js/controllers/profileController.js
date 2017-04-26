angular.module('app')
    .controller('ProfileController', function($scope, $state, CurrentUser, UserService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        $scope.move = function() {
            $state.go('user.home');
        };
    });
