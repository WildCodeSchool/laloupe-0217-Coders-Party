angular.module('app')
    .controller('AnonMainController', function($scope, EventService) {
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $scope.lastEvent = $scope.events[$scope.events.length - 1];
        });
    });
