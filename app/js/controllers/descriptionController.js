angular.module('app')
  .controller('DescriptionController', function($scope, $state, CurrentUser, UserService, EventService, LocalService) {
    UserService.getOne(CurrentUser.user()._id).then(function(res) {
      $scope.user = res.data;
    });
    var id = LocalService.get('eventId');
    var place = '';

    function onPlaceChanged() {
      var place = this.getPlace();
      for (var i in place.address_components) {
        var component = place.address_components[i];
        for (var j in component.types) { // Some types are ["country", "political"]
          var type_element = document.getElementById(component.types[j]);
          if (type_element) {
            type_element.value = component.long_name;
          }
        }
      }
      $scope.validateDescription = function() {
        var event = {
          adresse: place.formatted_address,
          lieu: $scope.evenement_lieu,
          description: $scope.evenement_description,
          place_url: place.url
        };
        EventService.update(id, event).then(function() {
          $state.go('user.invitations');
        });
      };
    }

    function initializeAutocomplete(id) {
      var element = document.getElementById(id);
      if (element) {
        var autocomplete = new google.maps.places.Autocomplete(element, {
          types: ['geocode']
        });
        google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
      }
    }
    initializeAutocomplete('user_input_autocomplete_address');
  });
