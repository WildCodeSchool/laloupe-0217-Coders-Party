angular.module('app')
    .controller('TobringlistController', function($scope, $state, CurrentUser, UserService, LocalService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });

        $scope.event = {};
        $scope.event.elements = [];
        $scope.newElement = "";
        $scope.addElement = function() {
            $scope.event.elements.push($scope.newElement);
            $scope.newElement = "";
        };
        var id = LocalService.get('eventId');
        $scope.valider = function() {
            EventService.update(id, $scope.event).then(function() {
                $state.go('user.happyEvent');
            });
        };
    });
