angular.module('app')
    .controller('EventController', function($scope, CurrentUser, $interval, $state, LocalService, UserService, EventService, $stateParams, CommentService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            EventService.getOne($stateParams.id).then(function(res) {
                $scope.event = res.data;
                $scope.class = "image_event_img";
                var id = ($stateParams.id);
                $scope.deleteEvent = function() {
                    EventService.sendAnnulation(id).then(function() {
                        EventService.delete(id);
                        $state.go('user.home');
                    });
                };
                UserService.getAll().then(function(res) {
                    $scope.users = res.data;
                    $('textarea.mention').mentionsInput({
                        onDataRequest: function(mode, query, callback) {
                            var data = [];
                            $scope.users.forEach(function(element) {
                                data.push({
                                    id: element._id,
                                    name: element.name,
                                    'avatar': "https://avatars.githubusercontent.com/" + element.odyssey + "?s=460",
                                    type: 'contact'
                                });
                            });
                            data = _.filter(data, function(item) {
                                return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
                            });

                            callback.call(this, data);
                        }
                    });

                    $('.get-syntax-text').click(function() {
                        $('textarea.mention').mentionsInput('val', function(text) {
                            alert(text);
                        });
                    });

                    $('.get-mentions').click(function() {
                        $('textarea.mention').mentionsInput('getMentions', function(data) {
                            alert(JSON.stringify(data));
                        });
                    });
                });


                $scope.hasPayed = function() {
                    var count = 0;
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        if ($scope.event.participations[i].hasPayed === true) {
                            count++;
                            console.log(count);
                        }
                    }
                    return count;
                };
                $scope.author = function() {
                    if ($scope.event.author._id === CurrentUser.user()._id) {
                        return true;
                    }
                };
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
                $scope.isTresorier = function() {
                    if ($scope.event.tresorier.email === CurrentUser.user().email && $scope.event.style === 'Cagnotte') {
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


                function addMembers() {
                    for (var i = 0; i < $scope.event.participations.length; i++) {
                        $scope.members.push($scope.event.participations[i].email);
                    }
                }

                function rmMembers(index) {
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

                addMembers();
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
                            addMembers();
                        });
                    });
                };

                $scope.validateMoney = function() {
                    EventService.update($stateParams.id, $scope.event);
                };
                $scope.doGo = function() {
                    $('.ticket-in').addClass('active');
                    $('.card-event').addClass('active');
                    if ($scope.event.style === 'Collaboratif') {
                        $('#bringModal').modal('open');
                    }
                    if ($scope.event.style === 'Cagnotte') {
                        $('#cagnotteModal').modal('open');
                    }
                    for (var i = 0; i < $scope.event.invitations.length; i++) {
                        if ($scope.event.invitations[i].email === $scope.user.email) {
                            $scope.event.participations.push($scope.user);
                        }
                    }

                    EventService.update($stateParams.id, $scope.event).then(function() {
                        EventService.getOne($stateParams.id).then(function(res) {
                            $scope.event = res.data;
                            addMembers();
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
                            rmMembers($scope.members.indexOf($scope.event.participations[i].email));
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
                            rmMembers();
                        });
                    });
                };

                $scope.neverGo = function() {
                    for (i = 0; i < $scope.event.invitations.length; i++) {
                        if ($scope.event.invitations[i].email === $scope.user.email) {
                            rmMembers($scope.members.indexOf($scope.event.invitations[i].email));
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
                    if (isParticipating() === false && isInvitated() === true) {
                        return true;
                    }
                };
                $scope.showRed = function() {
                    if (isParticipating() === true) {
                        return true;
                    }
                };
                $scope.comments = [];
                $scope.getComments = function(eventId) {
                    CommentService.getAllByEventId($scope.event._id, eventId).then(function(res) {
                        $scope.comments = res.data;
                    }, function(err) {});
                };
                $scope.getComments();
                $scope.addComment = function() {
                    var comment = {
                        eventId: $scope.event._id,
                        author: $scope.user._id,
                        author_odyssey: $scope.user.odyssey,
                        title: $scope.event.name,
                        body: $scope.commentBody
                    };
                    $scope.comments.push({
                        eventId: $scope.event._id,
                        author: $scope.user._id,
                        title: $scope.event.name,
                        body: $scope.commentBody
                    });
                    CommentService.addComment(comment).then(function() {
                        $scope.getComments();
                    });
                    $scope.commentBody = '';
                };
                $(document).ready(function() {
                    $('.modal').modal({
                        dismissible: false
                    });
                });

                function callAtInterval() {
                    $scope.getComments();
                }
                $interval(callAtInterval, 5000);
            });
        });
    });
