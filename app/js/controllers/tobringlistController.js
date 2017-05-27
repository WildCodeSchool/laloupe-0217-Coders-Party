angular.module('app')
    .controller('TobringlistController', function($scope, $state, CurrentUser, UserService, LocalService, EventService) {
        var id = LocalService.get('eventId');
        EventService.getOne(id).then(function(res) {
            $scope.event = res.data;
            console.log($scope.event);

        $scope.newEl = "";
        $scope.incQty = function(index) {
            $scope.event.elements.toBring[index].qty++;
            $scope.event.elements.toBring[index].bringedQty++;
            console.log($scope.event.elements);
        };
        $scope.decQty = function() {
            $scope.event.elements.toBring[index].qty--;
            $scope.event.elements.toBring[index].bringedQty--;
        };
        $scope.addElement = function() {
            $scope.event.elements.toBring.push({
                bringedQty: 0,
                qty: 0,
                value: $scope.newEl
            });
            console.log($scope.event);
            $scope.newEl = "";
        };
        $scope.valider = function() {
            EventService.update(id, $scope.event).then(function() {
                EventService.sendInvitation(id);
                $state.go('user.happyEvent');
            });
        };
      });
    });
