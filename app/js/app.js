angular.module('app', ['ui.router', 'ngMaterial', 'ngAria', 'ngAnimate'])
.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('DD/MM/YYYY');
  };
});
