angular.module('app')
    .controller('MainController', function($scope, CurrentUser, UserService, EventService, $location, GroupService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            console.log($scope.user);
        });
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $(document).ready(function() {
                $('.carousel').carousel();
                autoplay();
            });

            function autoplay() {
                $(document).ready(function() {
                    $('.carousel').carousel('next');
                    setTimeout(autoplay, 60000);
                });
            }
            $scope.next = function() {
                $(document).ready(function() {
                    $('.carousel').carousel('next');
                });
            };
            $scope.prev = function() {
                $(document).ready(function() {
                    $('.carousel').carousel('prev');
                });
            };
            $scope.moveToEvent = function(value) {
                $location.path('/user/event/id/' + value);
            };
            GroupService.getAll().then(function(res) {
                $scope.groups = res.data;
                console.log($scope.groups);
            });
        });
    });
