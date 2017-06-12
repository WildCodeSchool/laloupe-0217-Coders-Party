angular.module('app')
    .controller('CagnotteController', function($scope, $state, UserService, EventService, LocalService) {
        var id = LocalService.get('eventId');

        UserService.getAll().then(function(res) {
            $scope.users = res.data;
            var datas = [];
            var names = {
                data: {}
            };
            $scope.users.forEach(function(element) {
                datas.push({
                    odyssey: element.odyssey,
                    email: element.email
                });
            });
            datas.forEach(function(data) {
                names.data[data.email] = "https://avatars.githubusercontent.com/" + data.odyssey + "?s=460";
            });
            $('input.autocomplete').autocomplete(names);

            $scope.valider = function() {
              var event = {
                budget: $scope.budget,
                tresorier: $scope.tresorier
              };
                EventService.update(id, event).then(function() {
                    $state.go('user.happyEvent');
                });
            };
        });
    });
