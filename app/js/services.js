'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')

  .service('sidesShader', function() {
	  this.calculateColors = function( px, py, center) {
		  // offset the coordinates
		  var x = px - center.x;
		  var y = py - center.y;	 

		  var EAST = 0;
		  var NORTH = 1.5707963267948966;
		  var WEST = 3.141592653589793;
		  var SOUTH = -1.5707963267948966;


		  e: 0
		  n: 1.5707963267948966
		  w: 3.141592653589793
		  s: -1.5707963267948966
	  }
	  
	  this.offset = function(x, y, cx, cy) {
		return {x:x-cx , y:y-cy };
	}
	  
	  
  });
