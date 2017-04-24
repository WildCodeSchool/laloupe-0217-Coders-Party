angular.module('app')
    .factory('Auth', function($http, LocalService, AccessLevels) {
        function checkTokenStatus(token) {
            $http.get('/token_status');
        }

        var token = LocalService.get('auth_token');

        if (token) {
            token = angular.token;
            checkTokenStatus(token);
        }

        return {
            authorize: function(access) {
                if (access === AccessLevels.user) {
                    return this.isAuthenticated();
                } else {
                    return true;
                }
            },
            isAuthenticated: function() {
                return LocalService.get('auth_token');
            },
            login: function(credentials) {
                var login = $http.post('/login', credentials);
                login.then(function(result) {
                    LocalService.set('auth_token', result.data.token);
                    LocalService.set('user', JSON.stringify(result.data.user));
                }).catch(function() {});
                return login;
            },
            logout: function() {
                LocalService.unset('auth_token');
            },
            register: function(formData) {
                LocalService.unset('auth_token');
                var register = $http.post('/users', formData);
                register.then(function(result) {
                    LocalService.set('auth_token', result.data.token);
                    LocalService.set('user', JSON.stringify(result.data.user));
                }).catch(function() {});
                return register;
            }
        };
    })
    .factory('AuthInterceptor', function($q, $injector) {
        var LocalService = $injector.get('LocalService');

        return {
            request: function(config) {
                var token;
                if (LocalService.get('auth_token')) {
                    token = LocalService.get('auth_token');
                }
                if (token) {
                    config.headers.authorization = token;
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401 || response.status === 403) {
                    LocalService.unset('auth_token');
                    $injector.get('$state').go('anon.login');
                }
                return $q.reject(response);
            }
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
