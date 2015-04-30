'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$interval',
	function($scope, $http, $interval) {

		var loadText = ['Dancing madly around Azathoth...', 'Frenzied bodies heaving savagely...',
						'Removing Nyarlathotep\'s masks...', 'Chanting the Unspeakable Oath...',
						'Transporting brain cylinders to Yuggoth...', 'Penetrating the stygian depths...'];
		var maxWords = 750;
		var maxParas = 12;

		$scope.wordCount = 100;
		$scope.paraCount = 2;
		$scope.loadingText = '';
		$scope.hplipsum = [];

		var loaderInterval;
		var summoning = false;

		var setLoadText = function() {
			$scope.loadingText = loadText[Math.floor(Math.random() * loadText.length)];
		};

		var startLoadText = function() {
			setLoadText();
			loaderInterval = $interval(setLoadText, 1000);
		};

		var stopLoadText = function() {
			$scope.loadingText = '';
			$interval.cancel(loaderInterval);
		};

		$scope.generate = function() {
			if (summoning) {
				return;
			}
			summoning = true;
			startLoadText();
			$scope.hplipsum = [];
			$scope.wordCount = Math.min(maxWords, $scope.wordCount);
			$scope.paraCount = Math.min(maxParas, $scope.paraCount);
			$http.get('/ipsum/' + $scope.wordCount + '/' + $scope.paraCount).success(function(data) {
				$scope.hplipsum = data;
				stopLoadText();
				summoning = false;
			});
		};

		$scope.generate();

	}
]);