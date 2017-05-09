angular.module('app')
    .controller('AgendaController', function($scope, CurrentUser, UserService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        EventService.getAll().then(function(res){
          $scope.events = res.data;
        })
    });
