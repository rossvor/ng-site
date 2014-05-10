'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}])

.directive('otherDirective', function() {
	return {
		restrict: 'E',
		template: "<div>Something new here</div>"			  
	}
})

.directive('yetAnotherDirective', function() {
	return function (scope, element, attribute) {
		element.text(scope.message);
	}
})

.directive('myDir', function() {
	return {
		restrict: 'A',
		link: function (scope, element, attributes ){
			element.bind('mouseover', function() {
				console.log("I will execute when user moves mouse over this custome element");
			});
		}
			
	}
})
.directive('pyramid', function() {
	return {
		restrict: 'A',
		templateUrl: "partials/pyramid.html"
	}
})