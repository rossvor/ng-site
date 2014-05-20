'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
  .controller('TriangleConeCtrl', ['$scope', 'sidesShader', 'elementOffset', function($scope, shaderService, elmOffservice) {
	  
	  var worksize = {x:1000,y:1000};
	  var center = {x:worksize.x/2, y:worksize.y/2};
	  
	  var elm  = document.querySelector('#trianglesvg');
	  
	  var boxOffset = elmOffservice.offset(elm);
	  
	  var activated = true;
	  
	  //defaults
	  $scope.eastside = 0.001;
	  $scope.northside = 0.5;
	  $scope.westside = 0.8;
	  $scope.southside = 0.9;
	  
	  $scope.aPoint = "400,400";
	  $scope.bPoint = "400,600";
	  $scope.cPoint = "600,600";
	  
	  $scope.visibility = "visible";
	  $scope.shadowpoint = {x:"130",y:"850" };
	  
	  
	  $scope.angle = 0;
	  
	  $scope.activateSVG = function() { 

		  if (activated === true)
			  activated = false;
		  else activated = true;
	  }
	  
	  $scope.moved = function(e) {
		  
		if ( activated === false)
			return;
		
		var notscaledX = e.pageX - boxOffset.left;
		var notscaledY = e.pageY - boxOffset.top;
		
		var x = notscaledX * 1000 / worksize.x;
		var y = notscaledY * 1000 / worksize.y;
		
		$scope.xPos = x;
		$scope.yPos = y;
		
		var newOpacity =  shaderService.calculateOpacity(x,y, {x:500,y:500});
		$scope.eastside = newOpacity.eastside;
		$scope.northside = newOpacity.northside;
		$scope.westside = newOpacity.westside;
		$scope.southside = newOpacity.southside;
		$scope.shadowpoint = shaderService.getShadowPoint(x,y, 500, 500);
		
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
		
		//debug
		$scope.angle = newOpacity.angle;
		$scope.offset = shaderService.offset(x,y,center.x,center.y);
		
		
	}

  }])
  .controller('CodeCtrl', ['$scope', function($scope) {

  }])
  .controller('GraphicsCtrl', ['$scope','$timeout','$interval', function($scope, $timeout, $interval) {
	  
	  function animateBall () {
		var duration = 1000;  
		var frames = 30;
		var range = 0.6;
		
		var frameChange = range / frames;
		var timeBetweenFrames = duration / frames;
		
		
		$interval(function() {
			$scope.bottom1 -= frameChange;
			$scope.bottom2 -= frameChange;
			$scope.top1 -= frameChange;
			$scope.top2 -= frameChange;
		}, timeBetweenFrames, frames);
	  }
	  
	  $scope.bottom1 = 0.654;
	  $scope.bottom2 = 0.656;
	  $scope.top1 = 0.982;
	  $scope.top2 = 0.984;
	  
	  $timeout(function() {
		  animateBall();
	  }, 2000);
	  
	  $scope.hideSheet = true;
	  $timeout(function() {
		  $scope.hideSheet = false;
	  },2000);

  }])
  
  .controller('NavCtrl', ['$scope', function($scope) {
	  
  }]);
 