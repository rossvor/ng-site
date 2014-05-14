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
	  this.getShadowPoint = function (cursorX, cursorY, cx, cy){
		  
		  var offset = this.offset(cursorX, cursorY, cx, cy);
		  var result = {x:-offset.x+cx , y:-offset.y+cy };	//reverse offset with inverted coords
		  return result;
	  }
	  
	  this.shadowPath = function(coordinate, objectsize, worksize) {
		
		var sector;
		var a,b,c;
		
		var l = this.getCenteredBoxLimits(objectsize, worksize);
		
		if ( coordinate.x <= l.xLeft ) {
			if ( coordinate.y <= l.yTop) {
				sector = "NW";
				a = {x:l.xLeft, y:l.yBottom};
				b = {x:l.xRight, y:l.yBottom };
				c = {x:l.xRight, y:l.yTop};
			}
			else if ( coordinate.y > l.yTop) {
				if ( coordinate.y <= l.yBottom ) {
					sector = "W";
					a = {x:l.xRight, y:l.yTop};
					b = {x:l.xRight, y:worksize.y/2 };
					c = {x:l.xRight, y:l.yBottom};
				}
				else if ( coordinate.y > l.yBottom ) {
					sector = "SW";
					a = {x:l.xLeft, y:l.yTop};
					b = {x:l.xRight, y:l.yTop };
					c = {x:l.xRight, y:l.yBottom};
				}
			}
		}
		
		else if ( coordinate.x > l.xLeft ) {
			if ( coordinate.x <= l.xRight ) {
				if ( coordinate.y <= l.yTop) {
					sector = "N";
					a = {x:l.xLeft, y:l.yBottom};
					b = {x:worksize.x/2, y:l.yBottom };
					c = {x:l.xRight, y:l.yBottom};
					
				}
				else if ( coordinate.y > l.yTop) {
					if ( coordinate.y <= l.yBottom ) {
						sector = "C";
					}
					else if ( coordinate.y > l.yBottom ) {
						sector = "S";
						a = {x:l.xLeft, y:l.yTop};
						b = {x:worksize.x/2, y:l.yTop };
						c = {x:l.xRight, y:l.yTop};
					}
				}
			}
			else if ( coordinate.x > l.xRight ) {
				if ( coordinate.y <= l.yTop) {
					sector = "NE";
					a = {x:l.xLeft, y:l.yTop};
					b = {x:l.xLeft, y:l.yBottom };
					c = {x:l.xRight, y:l.yBottom};
				}
				else if ( coordinate.y > l.yTop) {
					if ( coordinate.y <= l.yBottom ) {
						sector = "E";
						a = {x:l.xLeft, y:l.yTop};
						b = {x:l.xLeft, y:worksize.y/2 };
						c = {x:l.xLeft, y:l.yBottom};
					}
					else if ( coordinate.y > l.yBottom ) {
						sector = "SE";
						a = {x:l.xLeft, y:l.yBottom};
						b = {x:l.xLeft, y:l.yTop };
						c = {x:l.xRight, y:l.yTop};
					}
				}
			}
		}
		
		return {sector:sector, a:a,b:b,c:c};
		
	}
	  
	  this.getCenteredBoxLimits = function(objectsize, worksize) {
		  
		var centerX = worksize.x / 2;
		var centerY = worksize.y / 2;
		
		var x1 = centerX - objectsize / 2;
		var y1 = centerY - objectsize / 2;
		
		var x2 = centerX + objectsize / 2;
		var y2 = centerY + objectsize / 2;
		
		return {xLeft:x1, xRight:x2, yTop:y1, yBottom:y2};
	}
	  
	  
  })
  
  .service('elementOffset', function() {
	  this.offset = function (element) {
		  
		  var documentElem;
		  var box = { top: 0, left: 0 };
		  var doc = element && element.ownerDocument;

		  if (!doc) {
			  return;
		  }

		  documentElem = doc.documentElement;

		  if ( typeof element.getBoundingClientRect !== undefined ) {
			  box = element.getBoundingClientRect();
		  }

		  return {
			  top: box.top + (window.pageYOffset || documentElem.scrollTop) - (documentElem.clientTop || 0),
			  left: box.left + (window.pageXOffset || documentElem.scrollLeft) - (documentElem.clientLeft || 0)
		  };
		  
	  }
	
});
