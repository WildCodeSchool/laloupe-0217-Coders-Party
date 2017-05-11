angular.module('app')
    .controller('EventController', function($scope, CurrentUser, LocalService, UserService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        var id = LocalService.get('thiseventid');
        EventService.getOne(id).then(function(res) {
            $scope.event = res.data;
            $scope.members = [];
            for (var i = 0; i < $scope.event.invitations.length; i++) {
                $scope.members.push($scope.event.invitations[i].odyssey);
            }
            console.log($scope.members);


            console.log($scope.event);
        });
    });
