angular.module('app')
    .service('EventService', function($http) {
        return {
            getAll: function() {
                return $http.get('/events');
            },
            getOne: function(id) {
                return $http.get('/events/' + id);
            },
            update: function(id, event) {
                return $http.put('/events/' + id, event);
            },
            delete: function(id) {
                return $http.delete('/events/' + id);
            },
            create: function(event) {
                return $http.post('/events', group);
            }
        };
    });
