'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}])

// workaround for carousel bug sourced from https://github.com/angular-ui/bootstrap/issues/1350#issuecomment-34595075
.directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    };
})



.directive('galleryModal',['$modal', function($modal) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'partials/gallerydir.html',
		link: function (scope, element, attribs) {
			
			scope.url = "img/gallery/thumbs/" + attribs.item;
			scope.open = function () {

				var modalInstance = $modal.open({
					templateUrl: 'partials/galleryModal.html',
					controller: function ($scope, $modalInstance, imgurls)  {
						$scope.imgUrls = imgurls;
					},
					size: 'lg',
					resolve: {
						imgurls: function () {
							var imgUrls = attribs.imgUrls.split(" ");
							return imgUrls;
				        }
					}
				});
			}
		}
	};
}]);

