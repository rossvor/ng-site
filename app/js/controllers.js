'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
  .controller('TriangleConeCtrl', ['$scope', 'sidesShader', 'elementOffset', function($scope, shaderService, elmOffservice) {
	  
	  var worksize = {x:1000,y:1000};
	  var center = {x:worksize.x/2, y:worksize.y/2};
	  
	  var elm  = document.querySelector('#trianglesvg');
	  
	  var boxOffset = elmOffservice.offset(elm);
//	  console.log(boxOffset);
	  
	  var activated = true;
	  
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
	  $scope.shadowpoint = {x:"130",y:"850"};
	  
	  $scope.angle = 0;
	  
	  $scope.activateSVG = function() { 

		  if (activated === true)
			  activated = false;
		  else activated = true;
	  }
	  
	  $scope.moved = function(e) {
		  
		if ( activated === false)
			return;
		  
		var x = e.pageX - boxOffset.left;
		var y = e.pageY - boxOffset.top;
		$scope.xPos = x;
		$scope.yPos = y;
		
		var newOpacity =  shaderService.calculateOpacity(x,y, center);
		$scope.eastside = newOpacity.eastside;
		$scope.northside = newOpacity.northside;
		$scope.westside = newOpacity.westside;
		$scope.southside = newOpacity.southside;
		$scope.shadowpoint = shaderService.getShadowPoint(x,y,center.x,center.y);
		
		var path = shaderService.shadowPath({x:x,y:y}, 200, worksize);
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
		
//		$scope.leftOffset = ;
		
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
		
//		function change (frame) {
//			if (frame < frames){
//				frame++;
//				$scope.bottom1 -= frameChange;
//				$scope.bottom2 -= frameChange;
//				$scope.top1 -= frameChange;
//				$scope.top2 -= frameChange;
//				$timeout( change(frame), timeBetweenFrames);
//			}
//		}
//		change(0);
		
//		for (var i=0;i < frames; i++){
//			$timeout(function() {
//				$scope.bottom1 -= frameChange;
//				$scope.bottom2 -= frameChange;
//				$scope.top1 -= frameChange;
//				$scope.top2 -= frameChange;
//			}, 1000 );
//
//		}

	  }
	  
	  $scope.bottom1 = 0.654;
	  $scope.bottom2 = 0.656;
	  $scope.top1 = 0.982;
	  $scope.top2 = 0.984;
//	  $scope.bottom1 = 0.054;
//	  $scope.bottom2 = 0.056;
//	  $scope.top1 = 0.382;
//	  $scope.top2 = 0.384;
	  
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
 