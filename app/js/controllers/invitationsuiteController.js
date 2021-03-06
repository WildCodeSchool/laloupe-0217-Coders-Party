angular.module('app')
    .controller('InvitationsuiteController', function($scope, $state, CurrentUser, UserService, GroupService, LocalService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        var id = LocalService.get('eventId');
        EventService.getOne(id).then(function(res) {
            $scope.event = res.data;
            UserService.getAll().then(function(res) {
                $scope.users = res.data;
                console.log($scope.users);
                for (i = 0; i < $scope.users.length; i++) {
                    if ($scope.users[i]._id === CurrentUser.user()._id) {
                        $scope.users.splice(i, 1);
                    }
                }
                $scope.event.invitations = [];

                $scope.valider = function() {
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].selected === true) {
                          console.log($scope.event);
                            $scope.event.invitations.push($scope.users[i]);
                        }
                    }
                    if ($scope.event.invitations.length > 0) {
                        EventService.update(id, $scope.event).then(function() {
                            if ($scope.event.style === 'Collaboratif') {
                                $state.go('user.tobringlist');
                            } else if ($scope.event.style === 'Libre') {
                                EventService.sendInvitation(id);
                                $state.go('user.happyEvent');
                            } else if ($scope.event.style === 'Cagnotte') {
                                $state.go('user.cagnotte');
                            }
                        });
                    } else {
                        $scope.validate = true;
                    }
                };
            });
        });
    });
