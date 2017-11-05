
'use strict';

var joeControllers = angular.module('joeControllers', []);


joeControllers.controller('LoadCtrl', ['$scope', '$http',
function LoadCtrl($scope, $http){
	$scope.wel = "welcome";
}]);

joeControllers.controller('RegisterCtrl', ['$scope', '$http',
function RegisterCtrl($scope, $http){
	
	var studentInfo = {}
	
	
	$scope.register = function()
	{
		if(typeof($scope.firstname ) == 'undefined'){ alert("Please Fill Your First Name"); return;}
		if(typeof($scope.lastname ) == 'undefined'){ alert("Please Fill Your Last Name"); return;}
		if(typeof($scope.email ) == 'undefined'){ alert("Please Fill Your Email"); return;}
		if(typeof($scope.phone ) == 'undefined'){ alert("Please Fill Your Phone"); return;}
		if(typeof($scope.password ) == 'undefined'){ alert("Please provide a password"); return;}
		if(typeof($scope.department ) == 'undefined'){ alert("Please provide a department"); return;}
		
		studentInfo.lastname = $scope.lastname;
		studentInfo.firstname = $scope.firstname;
		studentInfo.email = $scope.email;
		studentInfo.phone = $scope.phone;
		studentInfo.password = $scope.password;
		studentInfo.department = $scope.department;
		
		$http.post('/student/addstudent',  studentInfo)
          .then(function (response) {
              
			  if(response.status){
				 localStorage.setItem('email', $scope.email);
					$scope.lastname = "";
				  window.location = '/#!/view' ;
				 
			  }
                
                
          }, function (error) {
               
                console.log(error);
          });
	}
	
}]);

joeControllers.controller('ProfileCtrl', ['$scope', '$http',
function ProfileCtrl($scope, $http){
	
	$scope.wow = function()
	{
		if(!localStorage.email){
		 window.location = '/';
	}
	
	var email = localStorage.getItem('email');
	var obj = {};
	obj.email = email;
	$http.post('/student/getdetails',  obj)
          .then(function (response) {
			  console.log(response.data.student);
             
			  if(response.status){
				 var res = (response.data.student[0]);
				 console.log(res);
				 $scope.datas = res;
				  
			  }
                
                
          }, function (error) {
               
                console.log(error);
          });

		
	}
	 
}]);


joeControllers.controller('ViewCAllCtrl', ['$scope', '$http',
function ViewCAllCtrl($scope, $http){
	$http.post('/student/liststudents')
          .then(function (response) {
			  console.log(response.data.student);
             $scope.list = response.data.student;
			  if(response.status){
				
			  }
                
          }, function (error) {
               
                console.log(error);
          });	 
}]);



joeControllers.controller('DetailsCtrl', ['$scope', '$http', '$routeParams',
function DetailsCtrl($scope, $http, $routeParams){
	var id = {};
	id.id = $routeParams.id;
	$http.post('/student/pulldetails/', id)
          .then(function (response) {
			  console.log(response.data.student[0]);
             $scope.data = response.data.student[0];
			  if(response.status){
				
			  }
                
          }, function (error) {
               
                console.log(error);
          });	 
}]);


joeControllers.controller('EditCtrl', ['$scope', '$http', '$routeParams',
function EditCtrl($scope, $http, $routeParams){
	var id = {};
	id.id = $routeParams.id;
	$http.post('/student/pulldetails/', id)
          .then(function (response) {
			  console.log(response.data.student[0]);
             $scope.data = response.data.student[0];
			  if(response.status){
				
			  }
                
          }, function (error) {
               
                console.log(error);
          });
		  
		  $scope.update = function()
		  {
			$http.post('/student/updatestudent/', $scope.data)
          .then(function (response) {
			  console.log(response.data);
             window.location = '/#!/student/details/' + $scope.data._id ;
			  if(response.status){
				
			  }
                
          }, function (error) {
               
                console.log(error);
          });
		  }
}]);




joeControllers.controller('DeleteCtrl', ['$scope', '$http', '$routeParams',
function DeleteCtrl($scope, $http, $routeParams){
	var id = {};
	id.id = $routeParams.id;
	$http.post('/student/pulldetails/', id)
          .then(function (response) {
			  console.log(response.data.student[0]);
             $scope.data = response.data.student[0];
			  if(response.status){
				
			  }
                
          }, function (error) {
               
                console.log(error);
          });
		  
		  $scope.del = function()
		  {
			 
			$http.post('/student/deletestudent/', $scope.data)
          .then(function (response) {
			  console.log(response.data);
             window.location = '/#!/view';
			  if(response.status){
				
			  }
                
          }, function (error) {
               
                console.log(error);
          });
		  }
}]);
