angular.module('app')
    .controller('AgendaController', function($scope, CurrentUser, UserService, LocalService, EventService, $location) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $scope.moveToEvent = function(value) {
                $location.path('/user/event/id/' + value);
            };
        });
    });
