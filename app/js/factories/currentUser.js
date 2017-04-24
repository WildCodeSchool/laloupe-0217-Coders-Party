angular.module('app')
    .factory('CurrentUser', function(LocalService) {
        return {
            user: function() {
                if (LocalService.get('user')) {
                    return angular.fromJson(LocalService.get('user'));
                } else {
                    return {};
                }
            }
        };
    });
