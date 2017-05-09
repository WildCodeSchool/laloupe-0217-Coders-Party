angular.module('app')
    .controller('MyEventController', function($scope, CurrentUser, UserService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res) {
            $scope.allEvents = res.data;
            $scope.myEvents = [];
            for (var i = 0; i < $scope.allEvents.length; i++) {
                if ($scope.allEvents[i].author === CurrentUser.user()._id) {
                    $scope.myEvents.push($scope.allEvents[i]);
                }
            }
        })
    });
