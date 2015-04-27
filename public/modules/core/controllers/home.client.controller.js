'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.hplipsum = 'Generated text will go here.';

		$scope.generate = function() {
			$http.get('/ipsum').success(function(data) {
				$scope.hplipsum = data;
			});
		};
	}
]);