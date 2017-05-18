angular.module('app')
    .controller('InvitationsuiteController', function($scope, $state, CurrentUser, UserService, GroupService, LocalService, EventService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        UserService.getAll().then(function(res) {
            $scope.users = res.data;
            console.log($scope.users);
            $scope.event = {};
            $scope.event.invitations = [];

            var id = LocalService.get('eventId');
            $scope.valider = function() {
                for (var i = 0; i < $scope.users.length; i++) {
                    if ($scope.users[i].selected === true) {
                        $scope.event.invitations.push($scope.users[i]);
                    }
                }
                LocalService.set('invitsuiteKey', JSON.stringify($scope.event));
                    $state.go('user.tobringlist');
            };
        });
    });
