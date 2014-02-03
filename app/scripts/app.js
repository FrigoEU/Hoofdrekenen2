'use strict';

angular.module('hoofdrekenenApp', [
  'ngRoute','ngAnimate'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/math.html',
        controller: 'MathCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

document.addEventListener('deviceready', function() {
    angular.bootstrap( document, ['myApp']);
});
