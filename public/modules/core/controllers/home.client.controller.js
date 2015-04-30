'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {

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