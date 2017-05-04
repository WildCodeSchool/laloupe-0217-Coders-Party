angular.module('app')
  .controller('CreateEventController', function($scope, CurrentUser, EventService) {
    $scope.validateDate = function() {
      if ($scope.dateForm.$valid) {
        var event = {
          name: $scope.name,
          liste: [],
          invitations: [],
          image: '',
          startDate: $scope.startDate,
          startTime: $scope.startTime,
          endDate: $scope.endDate,
          endTime: $scope.endTime,
          author: CurrentUser.user()._id
        };
        EventService.create(event).then(function(res) {});
      }
    };
  });
