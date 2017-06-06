angular.module('app')
    .service('CommentService', function($http) {
        return {
            getAllByEventId: function (eventId) {
                return $http.get('/comments/forEvent/' + eventId);
            },
            addComment: function(comment) {
                return $http.post('/comments/addcomment/', comment);
            },
            // delComment: function(id, commentId) {
            //     return $http.put('/comments/delcomment', {user: id, beer: beerId, comment: commentId});
            // }
        };
    });
