'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
  .controller('MyCtrl1', ['$scope', 'sidesShader', function($scope, shaderService) {
	  
	  var center = {x:500, y:500};
	  
	  //defaults
	  $scope.eastside = 0.001;
	  $scope.northside = 0.5;
	  $scope.westside = 0.8;
	  $scope.southside = 0.9;
	  
	  $scope.a = {x:400, y:400};
	  $scope.b = {x:400, y:600};
	  $scope.c = {x:600, y:600};
	  
	  $scope.aPoint = "400,400";
	  $scope.bPoint = "400,600";
	  $scope.cPoint = "600,600";
	  
	  $scope.visibility = "visible";
	  
	  $scope.angle = 0;
	  
//	  $scope.sharppoint = "-473.44,250.06563";
	  $scope.sharppoint = "130,850";
	  
	  
	  
	  
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
		$scope.offset = shaderService.offset(x,y,center.x,center.y);
		$scope.shadowpoint = shaderService.getShadowPoint(x,y,center.x,center.y);
		
		var path = shaderService.shadowPath({x:x,y:y}, 200, {x:1000,y:1000});
		$scope.sector = path.sector;
		
		if (path.sector != "C") {
			$scope.visibility = "visible";
			$scope.aPoint = path.a.x + ',' + path.a.y;
			$scope.bPoint = path.b.x + ',' + path.b.y;
			$scope.cPoint = path.c.x + ',' + path.c.y;
		}
		else {
			$scope.visibility = "hidden";
		}
	}

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
 