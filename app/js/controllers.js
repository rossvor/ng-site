'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
  .controller('MyCtrl1', ['$scope', 'sidesShader', function($scope, shaderService) {
	  
	  var center = {x:500, y:500};
	  
	  //default opacity
	  $scope.eastside = 0.001;
	  $scope.northside = 0.5;
	  $scope.westside = 0.8;
	  $scope.southside = 0.9;
	  
	  $scope.angle = 0;
	  
	  $scope.moved = function(e) {
		
		var x = e.pageX;
		var y = e.pageY;
		$scope.xPos = x;
		$scope.yPos = y;
		
		var newOpacity =  shaderService.calculateOpacity(x,y, center);
		$scope.eastside = newOpacity.eastside;
		$scope.northside = newOpacity.northside;
		$scope.westside = newOpacity.westside;
		$scope.southside = newOpacity.southside;
		$scope.angle = newOpacity.angle;
	}

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
 