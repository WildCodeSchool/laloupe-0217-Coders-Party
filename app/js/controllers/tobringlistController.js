angular.module('app')
    .controller('TobringlistController', function($scope, $state, CurrentUser, UserService, LocalService, EventService) {
        var id = LocalService.get('eventId');
        EventService.getOne(id).then(function(res) {
            $scope.event = res.data;
            $scope.newEl = "";
            $scope.incQty = function(index) {
                $scope.event.elements.toBring[index].qty++;
                $scope.event.elements.toBring[index].bringedQty++;
            };
            $scope.decQty = function(index) {
              if ($scope.event.elements.toBring[index].qty !== 0) {
                $scope.event.elements.toBring[index].qty--;
                $scope.event.elements.toBring[index].bringedQty--;
              }
            };
            $scope.addElement = function() {
              $scope.show = false;
                $scope.event.elements.toBring.push({
                    bringedQty: 0,
                    qty: 0,
                    value: $scope.newEl
                });
                $scope.newEl = "";
            };
            $scope.show = false;
            $scope.valider = function() {
                if ($scope.event.elements.toBring.length > 0) {

                    EventService.update(id, $scope.event).then(function() {
                        EventService.sendInvitationCollaboratif(id);
                        $state.go('user.happyEvent');
                    });
                } else {
                    $scope.show = true;
                }
            };
        });
    });
