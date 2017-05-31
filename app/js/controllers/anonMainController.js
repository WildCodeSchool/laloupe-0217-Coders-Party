angular.module('app')
    .controller('AnonMainController', function($scope, EventService) {
        EventService.getAll().then(function(res) {
            $scope.events = res.data;
            $(document).ready(function(){
          $('.carousel').carousel();
        });





        });
    });
