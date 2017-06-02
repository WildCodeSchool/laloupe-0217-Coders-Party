angular.module('app')
    .controller('MainController', function($scope, EventService) {
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $(document).ready(function() {
                $('.carousel').carousel();
            });
        });
    });
