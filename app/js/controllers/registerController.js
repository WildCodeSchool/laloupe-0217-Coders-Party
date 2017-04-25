angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth) {
        $scope.register = function() {
            Auth.register($scope.user).then(function() {
                $state.go('user.profile');
            });
        };
        $(document).ready(function() {
            $('select').material_select();
        });

    });
