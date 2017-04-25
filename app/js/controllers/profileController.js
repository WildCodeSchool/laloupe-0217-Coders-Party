angular.module('app')
    .controller('ProfileController', function($scope, CurrentUser, UserService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });
        $(document).ready(function() {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
        });
        var id = CurrentUser.user()._id;
        console.log(id);
        $scope.createGroup = function() {
            UserService.update($scope.user._id, $scope.user);
        };
    });
