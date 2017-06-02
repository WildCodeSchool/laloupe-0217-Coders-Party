angular.module('app')
    .controller('MainController', function($scope, EventService, $location) {
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $(document).ready(function() {
                $('.carousel').carousel();
                autoplay();
            });

            function autoplay() {
                $('.carousel').carousel('next');
                setTimeout(autoplay, 15000);
            }
            $scope.next = function() {
                $('.carousel').carousel('next');
            };
            $scope.prev = function() {
                $('.carousel').carousel('prev');
            };
            $scope.moveToEvent = function(value) {
                $location.path('/user/event/id/' + value);
            };
        });
    });
