'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {

		var loadText = ['Dancing madly around Azathoth...', 'Frenzied bodies heaving savagely...',
						'Removing Nyarlathotep\'s masks...', 'Chanting the Unspeakable Oath...',
						'Transporting brain cylinders to Yuggoth...', 'Penetrating the stygian depths...'];
		$scope.hplipsum = [];
		$scope.wordCount = 100;
		$scope.paraCount = 2;

		var setLoadText = function() {
			$scope.hplipsum = [ loadText[Math.floor(Math.random()*loadText.length)] ];
		};

		$scope.generate = function() {
			$http.get('/ipsum/' + $scope.wordCount + '/' + $scope.paraCount).success(function(data) {
				$scope.hplipsum = data;
			});
		};

		setLoadText();
		$scope.generate();
		
	}
]);