angular.module('app')
    .controller('EventController', function($scope, CurrentUser, LocalService, UserService, EventService, $stateParams) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            var id = LocalService.get('thiseventid');
            EventService.getOne($stateParams.id).then(function(res) {
                $scope.event = res.data;
                $scope.class = "image_event_img";
                $scope.members = [];

                function AddMembers() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        $scope.members.push($scope.event.participations[i].email);
                    }
                }

                function toggleTicket() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        if ($scope.event.participations[i].email === $scope.user.email) {
                            $('.ticket-in').addClass('active');
                        }
                    }

                }

                function RmMembers(index) {
                    $scope.members.splice(index, 1);
                }
                toggleTicket();
                AddMembers();

                $scope.doGo = function() {
                    $('.ticket-in').addClass('active');
                    for (var i = 0; i < $scope.event.invitations.length; i++) {
                        if ($scope.event.invitations[i].email === $scope.user.email) {
                            $scope.event.participations.push($scope.user);
                        }
                    }
                    EventService.update(id, $scope.event).then(function() {
                        EventService.getOne(id).then(function(res) {
                            $scope.event = res.data;
                            AddMembers();
                        });
                    });
                };
                $scope.dontGo = function() {
                    $('.ticket-in').removeClass('active');
                    for (i = 0; i < $scope.event.participations.length; i++) {
                        if ($scope.event.participations[i].email === $scope.user.email) {
                            RmMembers($scope.members.indexOf($scope.event.participations[i].email));
                            $scope.event.participations.splice(i, 1);
                        }
                    }
                    EventService.update(id, $scope.event).then(function() {
                        EventService.getOne(id).then(function(res) {
                            $scope.event = res.data;
                        });
                    });
                };
                $scope.neverGo = function() {
                    for (i = 0; i < $scope.event.invitations.length; i++) {
                        if ($scope.event.invitations[i].email === $scope.user.email) {
                            RmMembers($scope.members.indexOf($scope.event.invitations[i].email));
                            $scope.event.invitations.splice(i, 1);
                        }
                    }
                    EventService.update(id, $scope.event).then(function() {
                        EventService.getOne(id).then(function(res) {
                            $scope.event = res.data;
                        });
                    });
                };

                function isParticipating() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        if ($scope.event.participations[i].email === $scope.user.email) {
                            return true;
                        }
                    }
                    return false;
                }

                function isInvitated() {
                    for (var i = 0; i < $scope.event.invitations.length; i++) {
                        if ($scope.event.invitations[i].email === $scope.user.email) {
                            return true;
                        }
                    }
                    return false;
                }
                $scope.hideGreen = function() {
                    if (isParticipating() === true || isInvitated() === false) {
                        return true;
                    }
                };
                $scope.showGrey = function() {
                    if (isParticipating() === false && isInvitated() === true)
                        return true;
                };
                $scope.showRed = function() {
                    if (isParticipating() === true) {
                        return true;
                    }
                };
                $(document).ready(function() {
                    $('.modal').modal();
                });


            });
        });
    });
