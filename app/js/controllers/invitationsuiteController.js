angular.module('app')
    .controller('InvitationsuiteController', function($scope, CurrentUser, UserService, GroupService, LocalService, InvitationService) {
            UserService.getOne(CurrentUser.user()._id).then(function(res) {
                $scope.user = res.data;
            });
            UserService.getAll().then(function(res) {
                    $scope.users = res.data;
                    console.log($scope.users);
                    $scope.events = {};
                    $scope.events.list = [];
                $scope.valider = function() {
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].selected === true) {
                            $scope.events.list.push($scope.users[i]);
                        }
                    }
                    console.log($scope.events);
                };
              });
            });
