angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth, GroupService) {
        $scope.user = {};
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
            $('.modal').modal();
        });
        $(document).ready(function() {
            $('select').material_select();
        });

        $scope.newGroup = "";
        $scope.updateGroup = function() {
            $scope.user.groupe = $scope.newGroup;
        };

    });
