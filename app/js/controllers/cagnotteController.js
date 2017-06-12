angular.module('app')
    .controller('CagnotteController', function($scope, $state, UserService, EventService, LocalService) {
        var id = LocalService.get('eventId');

        UserService.getAll().then(function(res) {
            $scope.users = res.data;
            var names = [];
            $scope.users.forEach(function(element) {
                names.push(element.name);
            });
            console.log(names);

            $('input.autocomplete').autocomplete({
                data: {
                    "Apple": null,
                    "Microsoft": null,
                    "Google": 'http://placehold.it/250x250'
                },
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                },
                minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
        });

    });
