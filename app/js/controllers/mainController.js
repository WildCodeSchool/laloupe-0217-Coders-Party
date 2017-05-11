angular.module('app')
    .controller('MainController', function($scope, $state, CurrentUser, UserService, LocalService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $scope.lastEvent = $scope.events[$scope.events.length -1];
            LocalService.set("thiseventid", $scope.lastEvent._id);
        });
    });
