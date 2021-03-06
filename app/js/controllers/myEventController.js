angular.module('app')
    .controller('MyEventController', function($scope, CurrentUser, UserService, LocalService, EventService, $location) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res) {
            $scope.allEvents = res.data;
            $scope.myEvents = [];
            $scope.iGo = [];
            $scope.isAuthor = [];
            $scope.isTresorier = [];
            for (i = 0; i < $scope.allEvents.length; i++) {
                if ($scope.allEvents[i].author._id === CurrentUser.user()._id) {
                    $scope.myEvents.push($scope.allEvents[i]);
                    $scope.isAuthor.push($scope.allEvents[i]._id);
                }
                if ($scope.allEvents[i].tresorier.email === CurrentUser.user().email) {
                    $scope.isTresorier.push($scope.allEvents[i]._id);
                }
                for (var g = 0; g < $scope.allEvents[i].invitations.length; g++) {
                    if ($scope.allEvents[i].invitations[g].email === CurrentUser.user().email && $scope.allEvents[i].author !== CurrentUser.user()._id) {
                        $scope.myEvents.push($scope.allEvents[i]);
                    }
                }
                for (var h = 0; h < $scope.allEvents[i].participations.length; h++) {
                    if ($scope.allEvents[i].participations[h].email === CurrentUser.user().email) {
                        $scope.iGo.push($scope.allEvents[i]._id);
                    }
                }
            }

            $scope.moveToEvent = function(value) {
                $location.path('/user/event/id/' + value);
            };

            $scope.showingMessage = function() {
                if ($scope.myEvents.length === 0) {
                    return true;
                }
            };
        });
    });
