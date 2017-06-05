angular.module('app')
    .controller('EventController', function($scope, CurrentUser, LocalService, UserService, EventService, $stateParams) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            EventService.getOne($stateParams.id).then(function(res) {
                $scope.event = res.data;
                $scope.class = "image_event_img";
                console.log($scope.event);
                $scope.isAuthor = function() {
                    if ($scope.event.author._id === CurrentUser.user()._id && $scope.event.style === 'Collaboratif') {
                        return true;
                    }
                };
                $scope.isParticipant = function() {
                    if ($scope.event.author._id !== CurrentUser.user()._id && $scope.event.style === 'Collaboratif' && $('.card-event').hasClass('active')) {
                        return true;
                    }
                };
                $scope.userBring = function() {
                    for (var i = 0; i < $scope.event.elements.partBring.length; i++) {
                        if ($scope.event.elements.partBring[i].email === $scope.user.email) {
                            var result = $scope.event.elements.partBring[i].bringThis;
                            return result;
                        }
                    }
                };
                // initialize a front array to manage img color :

                $scope.members = [];

                // initialize a front array to manage the object to update the elements.partBring :

                $scope.iBring = [];
                for (var i = 0; i < $scope.event.elements.toBring.length; i++) {
                    $scope.iBring.push({
                        value: $scope.event.elements.toBring[i].value,
                        number: 0
                    });
                }

                $scope.incQty = function(index) {
                    if ($scope.iBring[index].number < ($scope.event.elements.toBring[index].bringedQty)) {
                        $scope.iBring[index].number++;
                    }
                };
                $scope.decQty = function(index) {
                    if ($scope.iBring[index].number > 0) {
                        $scope.iBring[index].number--;
                    }
                };

                function updateQty() {
                    for (var i = 0; i < $scope.event.elements.toBring.length; i++) {
                        $scope.event.elements.toBring[i].bringedQty = $scope.event.elements.toBring[i].bringedQty - $scope.iBring[i].number;
                    }
                }


                function AddMembers() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        $scope.members.push($scope.event.participations[i].email);
                    }
                }

                function RmMembers(index) {
                    $scope.members.splice(index, 1);
                }

                function toggleTicket() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        if ($scope.event.participations[i].email === $scope.user.email) {
                            $('.ticket-in').addClass('active');
                            $('.card-event').addClass('active');
                        }
                    }

                }
                toggleTicket();

                AddMembers();
                $scope.validateBring = function() {
                    $scope.event.elements.partBring.push({
                        email: $scope.user.email,
                        name: $scope.user.name,
                        bringThis: $scope.iBring
                    });
                    updateQty();
                    $scope.iBring = [];
                    for (var i = 0; i < $scope.event.elements.toBring.length; i++) {
                        $scope.iBring.push({
                            value: $scope.event.elements.toBring[i].value,
                            number: 0
                        });
                    }
                    EventService.update($stateParams.id, $scope.event).then(function() {
                        EventService.getOne($stateParams.id).then(function(res) {
                            $scope.event = res.data;
                            AddMembers();
                        });
                    });
                };

                $scope.doGo = function() {
                    $('.ticket-in').addClass('active');
                    $('.card-event').addClass('active');
                    if ($scope.event.style === 'Collaboratif') {
                        $('#bringModal').modal('open');
                    }
                    for (var i = 0; i < $scope.event.invitations.length; i++) {
                        if ($scope.event.invitations[i].email === $scope.user.email) {
                            $scope.event.participations.push($scope.user);
                        }
                    }

                    EventService.update($stateParams.id, $scope.event).then(function() {
                        EventService.getOne($stateParams.id).then(function(res) {
                            $scope.event = res.data;
                            AddMembers();
                        });
                    });
                };

                function removeQty() {
                    var userBringThis = [];
                    var toBring = [];
                    for (var i = 0; i < $scope.event.elements.partBring.length; i++) {
                        if ($scope.event.elements.partBring[i].email === $scope.user.email) {
                            for (var g = 0; g < $scope.event.elements.partBring[i].bringThis.length; g++) {
                                userBringThis.push($scope.event.elements.partBring[i].bringThis[g].number);
                            }
                            for (i = 0; i < $scope.event.elements.toBring.length; i++) {
                                toBring.push($scope.event.elements.toBring[i].bringedQty);
                            }
                        }
                    }
                    var result = toBring.map(function(num, index) {
                        return num + userBringThis[index];
                    });
                    for (i = 0; i < $scope.event.elements.toBring.length; i++) {
                        $scope.event.elements.toBring[i].bringedQty = result[i];
                    }
                }

                $scope.dontGo = function() {
                    $('.ticket-in').removeClass('active');
                    $('.card-event').removeClass('active');
                    removeQty();
                    for (i = 0; i < $scope.event.participations.length; i++) {
                        if ($scope.event.participations[i].email === $scope.user.email) {
                            RmMembers($scope.members.indexOf($scope.event.participations[i].email));
                            $scope.event.participations.splice(i, 1);
                        }
                    }
                    for (i = 0; i < $scope.event.elements.partBring.length; i++) {
                        if ($scope.event.elements.partBring[i].email === $scope.user.email) {
                            $scope.event.elements.partBring.splice(i, 1);
                        }
                    }
                    EventService.update($stateParams.id, $scope.event).then(function() {
                        EventService.getOne($stateParams.id).then(function(res) {
                            $scope.event = res.data;
                            RmMembers();
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
                    $('.modal').modal({
                        dismissible: false
                    });
                });
            });
        });
    });
