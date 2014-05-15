'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/code', {templateUrl: 'partials/code.html', controller: 'CodeCtrl'});
  $routeProvider.when('/graphics', {templateUrl: 'partials/graphics.html', controller: 'GraphicsCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'TriangleConeCtrl'});
  $routeProvider.otherwise({redirectTo: '/about'});
}]);
