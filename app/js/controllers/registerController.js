angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth, GroupService, UserService) {
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            UserService.getAll().then(function(res) {
                $scope.users = res.data;
                $scope.show = function(value) {
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].email === value) {
                            return true;
                        }
                    }
                };
            });

            $scope.register = function() {
                $scope.user.groupe = $scope.newGroup;
                Auth.register($scope.user).then(function() {
                    for (var i = 0; i < $scope.groups.length; i++) {
                        if ($scope.groups[i].name === $scope.newGroup) {
                            $scope.groups[i].members.push($scope.user);
                            var id = $scope.groups[i]._id;
                            GroupService.update(id, $scope.groups[i]);
                            break;
                        } else if (i === $scope.groups.length - 1 && $scope.groups[i].name !== $scope.newGroup) {
                            GroupService.create({
                                name: $scope.newGroup,
                                members: [$scope.user]
                            });
                        }
                    }
                }).then(function() {
                    $state.go('user.profile');
                });
            };
            $(document).ready(function() {
                $('select').material_select();
            });
        });
    });
