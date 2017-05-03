angular.module('app')
    .service('InvitationService', function($http) {
        return {
            getAll: function() {
                return $http.get('/invitations');
            },
            getOne: function(id) {
                return $http.get('/invitations/' + id);
            },
            update: function(id, invitation) {
                return $http.put('/invitations/' + id, invitation);
            },
            delete: function(id) {
                return $http.delete('/invitations/' + id);
            },
            create: function(invitation) {
                return $http.post('/invitations', group);
            }
        };
    });
