'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));


  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
  
  describe('sidesShader', function() {
	  
	  var serviceObj;
	  
	  beforeEach(function () {
			inject(function (sidesShader) {
				serviceObj = sidesShader;			
			});
		
		});
	  
	  it('it should offset coordinates correctly to center', function() {
		var result = serviceObj.offset( 30, 400, 500, 500);
		  
		expect(result.x).toEqual(-470);
		expect(result.y).toEqual(-100);
	});
  });

  
});
