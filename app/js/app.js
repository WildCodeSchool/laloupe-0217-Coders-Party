angular.module('app', ['ui.router', 'ngMaterial', 'ngAria', 'ngAnimate'])
.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
  $mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', 'avri', 'mai', 'juin', 'juil', 'aout', 'sept', 'octo', 'nove', 'dece'];
  $mdDateLocaleProvider.days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  $mdDateLocaleProvider.shortDays = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];
  $mdDateLocaleProvider.msgCalendar = 'Calendrier';
  $mdDateLocaleProvider.msgOpenCalendar = 'Ouvrir le calendrier';
  $mdDateLocaleProvider.firstDayOfWeek = 1;

  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'L', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };

  $mdDateLocaleProvider.formatDate = function(date) {
    var m = moment(date);
    return m.isValid() ? m.format('L') : '';
  };

  $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
    return 'Semaine ' + weekNumber;
  };
  
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('DD/MM/YYYY');
  };
});
