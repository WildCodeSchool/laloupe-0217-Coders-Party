angular.module('app')
    .controller('EventController', function($scope, CurrentUser, LocalService, UserService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            var id = LocalService.get('thiseventid');
            EventService.getOne(id).then(function(res) {
                $scope.event = res.data;
                console.log($scope.event);
                $scope.class = "image_event_img";
                $scope.members = [];
                function AddMembers() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        $scope.members.push($scope.event.participations[i].email);
                    }
                }
                function RmMembers(index) {
                        $scope.members.splice(index,1);
                }
                AddMembers();
                $scope.doGo = function() {
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
                $scope.showGreen = function() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        if ($scope.event.participations[i].email === $scope.user.email) {
                            return true;
                        }
                    }
                };
                $scope.showRed = function() {
                    for (var i = 0; i < $scope.event.invitations.length; i++) {
                        if ($scope.event.invitations[i].email === $scope.user.email) {
                            return true;
                        }
                    }
                };
                $(document).ready(function() {
                    $('.modal').modal();
                });
            });
        });
    });
