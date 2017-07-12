angular.module('app')
    .controller('ProfileController', function($scope, $state, CurrentUser, UserService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
          $(document).ready(function() {
              $('.modal').modal({
              });
          });

            $scope.user = res.data;
            $scope.move = function() {
                $state.go('user.home');
            };
            if ($scope.user.odyssey === "ùmlmkm") {
                $scope.user.odyssey = "Aucun compte";
            }

            $scope.validate = function() {
              console.log($scope.password);
                UserService.update(CurrentUser.user()._id, {
                    password: $scope.password
                });
            };




        });
    });
