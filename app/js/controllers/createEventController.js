angular.module('app')
    .controller('CreateEventController', function($scope, $state, CurrentUser, EventService, LocalService) {
        $scope.validateDate = function() {
            $scope.myDate = new Date();
            $scope.minDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() - 2,
                $scope.myDate.getDate());
            $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() + 2,
                $scope.myDate.getDate());
            if ($scope.dateForm.$valid) {
                var event = {
                    name: $scope.name,
                    liste: [],
                    invitations: [],
                    image: '',
                    startDate: $scope.startDate,
                    startTime: $scope.startTime,
                    endDate: $scope.endDate,
                    endTime: $scope.endTime,
                    author: CurrentUser.user()._id
                };
                EventService.create(event).then(function(res) {
                    LocalService.set('eventId', res.data.event._id);
                }).then(function() {
                    $state.go('user.invitations');
                });
            }
        };
    });
