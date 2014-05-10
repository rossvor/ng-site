'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {
	  
	  var centre = {x:500, y:500};
	  
	  $scope.moved = function(e) {
		$scope.xPos = e.pageX;
		$scope.yPos = e.pageY;
	}

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
 