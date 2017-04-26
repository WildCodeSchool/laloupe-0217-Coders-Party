angular.module('app')
    .controller('InvitationsController', function($scope, CurrentUser, UserService, GroupService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            console.log($scope.groups);
        });
    });
