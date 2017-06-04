angular.module('app')
    .controller('AnonMainController', function($scope, UserService) {
        UserService.getAll().then(function(res) {
            var datas = res.data;
            $scope.users = datas;
            var length = 9-datas.length;

            function users() {
                for (var i =length; i >0 ; i--) {
                    $scope.users.push(datas[length-i]);
                }
            }
            users();
        });
    });
