angular.module('app')
    .controller('InvitationsController', function($scope, CurrentUser, UserService, GroupService, LocalService, EventService, $state) {

        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        GroupService.getAll().then(function(res) {
            $scope.groups = res.data;
            console.log($scope.groups);
            $scope.event = {};
            $scope.event.invitations = [];
            $scope.groupok = function() {
                for (var i = 0; i < $scope.groups.length; i++) {
                    if ($scope.groups[i].selected === true) {
                        return true;
                    }
                }
            };
        var id = LocalService.get('eventId');
        console.log(id);
        $scope.valider = function() {
            for (var i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups[i].selected === true) {
                    $scope.event.invitations.push($scope.groups[i]);
                }
            }
            EventService.update(id, $scope.event).then(function() {
                $state.go('user.tobringlist');
            });
        };
    });
  });
