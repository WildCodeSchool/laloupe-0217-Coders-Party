angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth, GroupService) {
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            console.log($scope.groups);

            $scope.register = function() {
                $scope.user.groupe = $scope.newGroup;
                Auth.register($scope.user).then(function() {
                    for (var i = 0; i < $scope.groups.length; i++) {
                        if ($scope.groups[i].name === $scope.newGroup) {
                            $scope.groups[i].members.push($scope.user);
                            var id = $scope.groups[i]._id;
                            GroupService.update(id, $scope.groups[i]);
                        } else if (i === $scope.groups.length - 1) {
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
