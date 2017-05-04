angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
        $stateProvider
            .state('anon', {
                abstract: true,
                data: {
                    access: AccessLevels.anon
                },
                views: {
                    'navbar@': {
                        templateUrl: 'anon/navbar.html',
                        controller: 'NavbarController'
                    },
                    'footer@': {
                      templateUrl: 'anon/footer.html',
                      controller: 'FooterController'
                    }
                }
            })
            .state('anon.home', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'anon/home.html',
                        controller: 'MainController'
                    }
                }
            })
            .state('anon.login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: 'anon/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('anon.register', {
                url: '/register',
                views: {
                    'content@': {
                        templateUrl: 'anon/register.html',
                        controller: 'RegisterController'
                    }
                }
            });
        $stateProvider
            .state('user', {
                abstract: true,
                url: '/user',
                views: {
                    'navbar@': {
                        templateUrl: 'user/navbar.html',
                        controller: 'NavbarController'
                    },
                    'footer@': {
                      templateUrl: 'user/footer.html',
                      controller: 'FooterController'
                    }
                },
                data: {
                    access: AccessLevels.user
                }
            })
            .state('user.dashboard', {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'user/dashboard.html',
                        controller: 'DashboardController'
                    }
                }
            })
            .state('user.agenda', {
                url: '/agenda',
                views: {
                    'content@': {
                        templateUrl: 'user/agenda.html',
                        controller: 'AgendaController'
                    }
                }
            })
            .state('user.home', {
                url: '/home',
                views: {
                    'content@': {
                        templateUrl: 'user/home.html',
                        controller: 'MainController'
                    }
                }
            })
            .state('user.createevent', {
              url: '/createevent',
              views: {
                'content@': {
                  templateUrl: 'user/createevent.html',
                  controller: 'CreateEventController'
                }
              }
            })
            .state('user.invitations', {
              url: '/invitations',
              views: {
                'content@': {
                  templateUrl: 'user/invitations.html',
                  controller: 'InvitationsController'
                }
              }
            })
            .state('user.invitationsuite', {
              url: '/invitationsuite',
              views: {
                'content@': {
                  templateUrl: 'user/invitationsuite.html',
                  controller: 'InvitationsuiteController'
                }
              }
            })
            .state('user.profile', {
                url: '/profile',
                views: {
                    'content@': {
                        templateUrl: 'user/profile.html',
                        controller: 'ProfileController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    });
