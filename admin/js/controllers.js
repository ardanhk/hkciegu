var ctrlModule = angular.module('orgComAdmin.controllers', []);

ctrlModule.controller('MainCtrl', ['$scope', '$location', 'ActService', function ($scope, $location, ActService) {
	$scope.activities = {};

	$scope.getActs = function() {
		$scope.activities = ActService.getActivities().
			success(function (data, status, headers, config) {
				$scope.activities = data.activities;
			}).
			error(function (data, status, headers, config) {
				console.error(data);
			});
	}

	$scope.createAct = function() {
		$location.path("/createAct");
	};

	$scope.editAct = function(activity) {
		console.log("/editAct/" + activity._id);
		//$location.path();
	}

}]);

ctrlModule.controller('CreateActCtrl', ['$scope', '$timeout', '$location', 'ActService', function ($scope, $timeout, $location, ActService) {
	$scope.format = "dd-MM-yyyy";
	$scope.success = $scope.fail = false;

	$scope.openStart = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.startOpened = true;
	};

	$scope.openEnd = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.endOpened = true;
	};

	$scope.submit = function() {
		var success = false;

		ActService.newActivity($scope.activity).
			success(function (data, status, headers, config) {
				$scope.success = data.success;
				$scope.fail = !data.success;
				$scope.message = data.message;

				if ($scope.success)
					$timeout(function() {
						$location.path('/admin');
					}, 1000);
			}).
			error(function (data, status, headers, config) {
				$scope.success = false;
				$scope.fail = true;
				$scope.message = data.message;
			});

	};
}]);

ctrlModule.controller('EditActCtrl', ['$scope', '$timeout', '$location', 'ActService', function ($scope, $timeout, $location, ActService) {
	$scope.activity = {};

	$scope.findAct = function(ActivityId) {
		ActService.findActivity(ActivityId).
			success(function (data, status, headers, config) {
				$scope.success = data.success;
				$scope.fail = !data.success;

				if ($scope.success)
					$scope.activity = data.activity;
			}).
			error(function (data, status, headers, config) {
				$scope.success = false;
				$scope.fail = true;
			});
	}
}]);
