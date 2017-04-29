angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth, GroupService) {
        $scope.register = function() {
            Auth.register($scope.user).then(function() {
                GroupService.create({
                    name: $scope.newGroup
                });
                $state.go('user.profile');
            });
        };
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            console.log($scope.groups);
        });
        $(document).ready(function() {
            $('select').material_select();
        });
    });
