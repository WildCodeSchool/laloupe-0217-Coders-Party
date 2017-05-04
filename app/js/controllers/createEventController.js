angular.module('app')
    .controller('CreateEventController', function($scope, CurrentUser, EventService) {
      $scope.validate = false;
      this.myDate = new Date();
      this.isOpen = false;
      $scope.validateDate = function () {
        var event = {
          name: '',
          liste: [],
          invitations: [],
          image: '',
          startDate: $scope.startDate,
          endDate: $scope.endDate,
          author: CurrentUser.user()._id
        };
        EventService.create(event).then(function(res) {
        });
      };
    });
