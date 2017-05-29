angular.module('app')
    .controller('MainController', function($scope, $state, CurrentUser, UserService, LocalService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });

        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $scope.lastEvent1 = $scope.events[$scope.events.length -1];
            $scope.lastEvent2 = $scope.events[$scope.events.length -2];
            $scope.lastEvent3 = $scope.events[$scope.events.length -3];
            $scope.lastEvent4 = $scope.events[$scope.events.length -4];

            LocalService.set("thiseventid", $scope.lastEvent1._id);
        });
    });
