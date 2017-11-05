



/* chapter5/app.js */
'use strict';
/* App Module */
var joe = angular.module('joe', [
'ngRoute',
'joeControllers',
'ngResource'
]);



 
joe.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
$routeProvider.
when('/add', {
templateUrl: '/student/restrationform',
controller: 'RegisterCtrl'
}).when('/view', {
templateUrl: '/student/viewall',
controller: 'ViewCAllCtrl'
}).when('/student/details/:id', {
templateUrl: '/student/details',
controller: 'DetailsCtrl'
}).when('/student/edit/:id', {
templateUrl: '/student/edit',
controller: 'EditCtrl'
}).when('/student/delete/:id', {
templateUrl: '/student/delete',
controller: 'DeleteCtrl'
});


$locationProvider.html5Mode(false).hashPrefix('!');
}]);
