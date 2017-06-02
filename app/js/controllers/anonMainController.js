angular.module('app')
    .controller('AnonMainController', function($scope, EventService) {
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $(document).ready(function() {
                $('.carousel').carousel();
                autoplay();
            });

            function autoplay() {
                $('.carousel').carousel('next');
                setTimeout(autoplay, 10000);
            }
            $scope.next = function() {
                $('.carousel').carousel('next');
            };
            $scope.prev = function() {
                $('.carousel').carousel('prev');
            };
        });
    });
