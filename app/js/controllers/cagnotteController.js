angular.module('app')
    .controller('CagnotteController', function($scope, $state, UserService, EventService, LocalService) {
        var id = LocalService.get('eventId');

        UserService.getAll().then(function(res) {
            $scope.users = res.data;
            var datas = [];
            var names = {
                data: {}
            };

            $scope.tresorier = {
                name: "",
            };

            $scope.users.forEach(function(element) {
                datas.push({
                    odyssey: element.odyssey,
                    name: element.name,
                    email: element.email
                });
            });
            datas.forEach(function(data) {
                names.data[data.name] = "https://avatars.githubusercontent.com/" + data.odyssey + "?s=460";
            });
            $('input.autocomplete').autocomplete(names);

            $scope.valider = function() {
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].name === $scope.tresorier.name) {
                        $scope.tresorier.email = datas[i].email;
                    }
                }
                var event = {
                    budget: $scope.budget,
                    tresorier: $scope.tresorier
                };

                EventService.update(id, event).then(function() {
                  EventService.sendInvitationCagnotte(id);
                    $state.go('user.happyEvent');
                });
            };
        });
    });
