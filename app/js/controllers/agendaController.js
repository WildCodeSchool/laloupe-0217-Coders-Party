angular.module('app')
    .controller('AgendaController', function($scope, CurrentUser, UserService, LocalService, EventService, $location) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res) {
            $scope.allEvents = res.data;
            $scope.events = [];

            function filter() {
                for (var i = 0; i < $scope.allEvents.length; i++) {
                    if ($scope.allEvents[i].private === false) {
                        $scope.events.push($scope.allEvents[i]);
                    }
                }
            }
            filter();
                $scope.moveToEvent = function(value) {
                    $location.path('/user/event/id/' + value);
                };
        });
    });
