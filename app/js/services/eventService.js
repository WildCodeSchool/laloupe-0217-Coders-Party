angular.module('app')
    .service('EventService', function($http) {
        return {
            getAll: function() {
                return $http.get('/events');
            },
            getOne: function(id) {
                return $http.get('/events/id/' + id);
            },

            update: function(id, event) {
                return $http.put('/events/' + id, event);
            },
            delete: function(id) {
                return $http.delete('/events/' + id);
            },
            create: function(event) {
                return $http.post('/events/newevent', event);
            },
            sendInvitation: function(id) {
              return $http.get('/events/sendall/' + id);
            },
            sendAnnulation: function(id) {
              return $http.get('/events/sendcancel/' + id);
            }
        };
    });
