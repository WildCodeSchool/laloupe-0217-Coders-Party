angular.module('app')
    .controller('MainController', function($scope, EventService, $location) {
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            console.log($scope.events);

            // $scope.active = function($event) {
            //   console.log($event.target);
            //   // console.log(  $("a").eq(index).hasClass("active");));
            //   //   $(".carousel-item").eq(index).hasClass("active");
            // };

            $(document).ready(function() {
                $('.carousel').carousel();
            });

            $scope.moveToEvent = function(value) {
                $location.path('/user/event/id/' + value);
            };
        });
    });
