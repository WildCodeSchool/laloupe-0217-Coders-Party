angular.module('app')
    .controller('TobringlistController', function($scope, CurrentUser, UserService, LocalService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        
        $scope.event = {};
        $scope.event.elements = [];
        $scope.newElement = "";
        $scope.addElement = function() {
            $scope.event.elements.push($scope.newElement);
            $scope.newElement = "";
        }

        $scope.valider = function() {
          Event.udpate(id, $scope.event).then(function() {
              $state.go('user.happyParty');
          });
            console.log($scope.events);

        };
    });
