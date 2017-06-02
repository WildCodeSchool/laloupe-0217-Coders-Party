angular.module('app')
    .controller('MainController', function($scope, EventService, $location) {
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $(document).ready(function() {
                $('.carousel').carousel();
            });
            $scope.moveToEvent = function(value) {
                $location.path('/user/event/id/' + value);
            };
        });
    });
