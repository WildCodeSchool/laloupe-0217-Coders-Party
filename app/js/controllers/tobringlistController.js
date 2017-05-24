angular.module('app')
    .controller('TobringlistController', function($scope, $state, CurrentUser, UserService, LocalService, EventService) {
      var id = LocalService.get('eventId');
        EventService.getOne(id).then(function(res) {
            $scope.event = res.data;
        });

        $scope.event = [];
        $scope.event.elements = [];
        $scope.newElement = "";
        $scope.addElement = function() {
            $scope.event.elements.push($scope.newElement);
            $scope.newElement = "";
        };
        $scope.valider = function() {
            EventService.update(id, $scope.event).then(function() {
                EventService.sendInvitation(id);
                $state.go('user.happyEvent');
            });
        };
    });
