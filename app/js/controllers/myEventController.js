angular.module('app')
    .controller('MyEventController', function($scope, CurrentUser, UserService, LocalService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res) {
            $scope.allEvents = res.data;
            $scope.myEvents = [];
            for (i = 0; i < $scope.allEvents.length; i++) {
                if ($scope.allEvents[i].author === CurrentUser.user()._id) {
                    $scope.myEvents.push($scope.allEvents[i]);
                }
                for (var g = 0; g < $scope.allEvents[i].invitations.length; g++) {
                    if ($scope.allEvents[i].invitations[g]._id === CurrentUser.user()._id && $scope.allEvents[i].author !== CurrentUser.user()._id) {
                        $scope.myEvents.push($scope.allEvents[i]);
                    }
                }
            }
            $scope.setLocalService = function(value) {
                LocalService.set('thiseventid', value);
            };

            $scope.showingMessage = function() {
                if ($scope.myEvents.length === 0) {
                    return true;
                }
            };
        });
    });
