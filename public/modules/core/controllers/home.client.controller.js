'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.hplipsum = ['Generated text will go here.'];
		$scope.wordCount = 100;
		$scope.paraCount = 2;

		$scope.generate = function() {
			$http.get('/ipsum/'+$scope.wordCount+'/'+$scope.paraCount).success(function(data) {
				$scope.hplipsum = data;
			});
		};
	}
]);