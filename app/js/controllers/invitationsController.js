angular.module('app')
    .controller('InvitationsController', function($scope, CurrentUser, UserService, GroupService, LocalService, EventService, $state) {

        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        var id = LocalService.get('eventId');
        EventService.getOne(id).then(function(res) {
            $scope.event = res.data;
            GroupService.getAll().then(function(res) {
                $scope.groups = res.data;
                $scope.groupok = function() {
                    for (var i = 0; i < $scope.groups.length; i++) {
                        if ($scope.groups[i].selected === true) {
                            return true;
                        }
                    }
                };
                $scope.valider = function() {
                  $scope.validate=true;
                    if ($scope.groupok()===true) {
                        for (var i = 0; i < $scope.groups.length; i++) {
                            if ($scope.groups[i].selected === true) {
                                for (var g = 0; g < $scope.groups[i].members.length; g++) {
                                    $scope.event.invitations.push($scope.groups[i].members[g]);
                                }
                            }
                        }
                        EventService.update(id, $scope.event).then(function() {
                            if ($scope.event.style === 'Collaboratif') {
                                $state.go('user.tobringlist');
                            } else if ($scope.event.style === 'Libre') {
                                EventService.sendInvitation(id);
                                $state.go('user.happyEvent');
                            }
                        });
                    }
                };
            });
        });
    });
