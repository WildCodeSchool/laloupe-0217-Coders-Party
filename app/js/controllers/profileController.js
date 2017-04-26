angular.module('app')
    .controller('ProfileController', function($scope, $state, CurrentUser, UserService, GroupService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            console.log($scope.groups);
        });

        $(document).ready(function() {
            $('.modal').modal();
        });
        var id = CurrentUser.user()._id;
        console.log(id);

        $scope.newGroup = "";
        $scope.createGroup = function() {
            $scope.user.groupe = $scope.newGroup;
            GroupService.create({
                name: $scope.newGroup
            });
            UserService.update($scope.user._id, $scope.user).then(function() {
                $state.go('user.home');
            });
        };

        $scope.updateGroup = function() {
            $scope.user.groupe = $scope.newGroup;
        };
    });
