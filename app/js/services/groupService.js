angular.module('app')
    .service('GroupService', function($http) {
        return {
            getAll: function() {
                return $http.get('/groups');
            },
            getOne: function(id) {
                return $http.get('/groups/' + id);
            },
            update: function(id, group) {
                return $http.put('/groups/' + id, group);
            },
            delete: function(id) {
                return $http.delete('/groups/' + id);
            },
            create: function(group) {
                return $http.post('/groups', group);
            }
        };
    });
