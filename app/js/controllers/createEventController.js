angular.module('app')
  .controller('CreateEventController', function($scope, $state, CurrentUser, EventService, LocalService) {
    $(document).ready(function() {
      $('select').material_select();
    });
    $scope.myDate = new Date();
    $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());
    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
    $scope.validateDate = function() {
      if ($scope.dateForm.$valid) {
        var event = {
          name: $scope.name,
          liste: [],
          invitations: [],
          categorie: $scope.typeEvent,
          startDate: $scope.startDate,
          startTime: $scope.startTime,
          author: CurrentUser.user()._id,
          adresse: '',
          lieu: '',
          description: '',
          place_url: ''
        };
        EventService.create(event).then(function(res) {
          LocalService.set('eventId', res.data.event._id);
        }).then(function() {
          $state.go('user.description');
        });
      }
    };
  });
