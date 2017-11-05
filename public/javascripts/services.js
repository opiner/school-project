
'use strict'

var blogService = angular.module('blogService', ['ngResource']);
 
 
 blogService.factory('blogPostNew', ['$resource',
 function($resource){
 return $resource('http://localhost/anjularjsblog/api/blog.php', {}, {
 get : {method: 'GET', isArray: true, cached:false},
 save : {method: 'POST', isArray: false, cached:false},
 update : {method: 'PUT', isArray: false, cached:false},
 delete : {method: 'DELETE', isArray: false, cached:false}
 })
 
}])


 blogService.factory('blogMakePost', ['$resource',
 function($resource){
 return $resource('http://localhost/anjularjsblog/api/makepost.php', {}, {
 save : {method: 'POST', isArray: false, cached:false},
 get : {method: 'GET', isArray: true, cached:false}
 })
 
}])


 blogService.factory('blogList', ['$resource',
 function ($resource){
 return $resource('http://localhost/angularjsblog/api/list.php', {}, {
 get : {method: 'GET', isArray: false, cached:false},
 save : {method: 'POST', isArray: false, cached:false},
 update : {method: 'PUT', isArray: false, cached:false},
 delete : {method: 'DELETE', isArray: false, cached:false}
 })
 
}])

