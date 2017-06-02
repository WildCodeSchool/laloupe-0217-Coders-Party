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
                        controller: 'AnonMainController'
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
            .state('user.agenda', {
                url: '/agenda',
                views: {
                    'content@': {
                        templateUrl: 'user/agenda.html',
                        controller: 'AgendaController'
                    }
                }
            })
            .state('user.event', {
                url: '/event/id/:id',
                views: {
                    'content@': {
                        templateUrl: 'user/event.html',
                        controller: 'EventController'
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
                'slide@': {
                  templateUrl: 'user/createevent.html',
                  controller: 'CreateEventController'
                }
              }
            })
            .state('user.description', {
              url: '/description',
              views: {
                'slide@': {
                  templateUrl: 'user/description.html',
                  controller: 'DescriptionController'
                }
              }
            })
            .state('user.invitations', {
              url: '/invitations',
              views: {
                'slide@': {
                  templateUrl: 'user/invitations.html',
                  controller: 'InvitationsController'
                }
              }
            })
            .state('user.invitationsuite', {
              url: '/invitationsuite',
              views: {
                'slide@': {
                  templateUrl: 'user/invitationsuite.html',
                  controller: 'InvitationsuiteController'
                }
              }
            })
            .state('user.happyEvent', {
              url: '/happyEvent',
              views: {
                'slide@': {
                  templateUrl: 'user/happyEvent.html',
                  controller: 'HappyEventController'
                }
              }
            })
            .state('user.tobringlist', {
              url: '/tobringlist',
              views: {
                'slide@': {
                  templateUrl: 'user/tobringlist.html',
                  controller: 'TobringlistController'
                }
              }
            })
            .state('user.myEvent', {
              url: '/myEvent',
              views: {
                'content@': {
                  templateUrl: 'user/myEvent.html',
                  controller: 'MyEventController'
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
