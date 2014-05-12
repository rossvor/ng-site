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
		
		it('getCenteredBoxLimits should return correct points', function() {
			
			var result = serviceObj.getCenteredBoxLimits(200, {x:1000,y:1000});
			
			expect(result.xLeft).toEqual(400);
			expect(result.xRight).toEqual(600);
			
			expect(result.yTop).toEqual(400);
			expect(result.yBottom).toEqual(600);
			
		});


		describe('shadowpath', function() {

			var spResult;

			beforeEach(function() {
				spResult = serviceObj.shadowPath({x:508,y:232}, 200, {x:1000,y:1000});
			});

			it(' shadowpath should return correct debug var', function() {
				expect(spResult.sector).toEqual("N");
			});

			it(' shadowpath should return correct point coordinates ', function() {

				expect(spResult.a.x).toEqual(400);
				expect(spResult.a.y).toEqual(600);

				expect(spResult.b.x).toEqual(500);
				expect(spResult.b.y).toEqual(600);

				expect(spResult.c.x).toEqual(600);
				expect(spResult.c.y).toEqual(600);

			});
		});
	});
});
