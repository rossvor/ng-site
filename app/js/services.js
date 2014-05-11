'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')

  .service('sidesShader', function() {
	  // this one is public static method
	  this.calculateOpacity = function( px, py, center) {
		  // offset the coordinates
		  var offsetResult = this.offset(px,py, center.x, center.y);
		  var x = offsetResult.x;
		  var y = offsetResult.y;	 

		  
		  var angleInRads = Math.atan2(y, x);

		  return { eastside:this.opacityByRadians( angleInRads),
			  	  northside:this.opacityByRadians( Math.abs(Math.atan2(x, y)) - Math.PI),
			  	  westside:this.opacityByRadians( Math.abs(angleInRads) - Math.PI),
			  	  southside:this.opacityByRadians( Math.abs(Math.atan2(x, y))),
			  	  
			  	  angle:angleInRads //for debug
			  	};

	  }
	  
	  this.offset = function(x, y, cx, cy) {
		return {x:x-cx , y:y-cy };
	}
	  this.opacityByRadians = function(radian) {
		  
		// Biggest difference is PI
		return Math.abs(radian) / Math.PI;
	}
	  
	  
  });
