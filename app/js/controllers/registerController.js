angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth, GroupService) {
        $scope.register = function() {
            Auth.register($scope.user).then(function() {
                $state.go('user.profile');
            });
        };
        $(document).ready(function() {
            $('select').material_select();
        });
        GroupService.getAll().then(function(res) {
                $scope.groups = res.data

            console.log($scope.groups);
        });

    });
