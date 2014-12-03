var ctrlModule = angular.module('orgComAdmin.controllers', []);

ctrlModule.controller('ActCtrl', ['$scope, $location', function ($scope, $location) {
	$scope.createAct = function() {
		$location.path = "/createAct"
	};
}]);

ctrlModule.controller('CreateActCtrl', ['$scope', function ($scope) {
	
}]);