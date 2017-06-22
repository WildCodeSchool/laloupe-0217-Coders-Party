angular.module('app')
    .controller('HappyEventController', function($scope, $state, $timeout, CurrentUser) {
        $scope.spinnerMail = true;
        function callAtTimeout() {
            $scope.spinnerMail = false;
            }
              $timeout(callAtTimeout, 3500);
    });
