var ctrlModule = angular.module('orgComAdmin.controllers', []);

ctrlModule.controller('MainCtrl', ['$scope', '$location', '$timeout', 'ActService', function ($scope, $location, $timeout, ActService) {
	$scope.activities = {};
	$scope.success = true;
	$scope.message = '';

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
		$location.path('/editAct/' + activity._id);
	}

	$scope.deleteAct = function(activity) {
		ActService.deleteActivity(activity).
			success(function (data, status, headers, config) {
				$scope.success = data.success;

				if ($scope.success) {
					$scope.message = '活動已經成功刪除';
					$scope.getActs();
				} else {
					$scope.message = data.message;
				}
				$scope.hideMessage();
			}).
			error(function (data, status, headers, config) {
				$scope.message = '無法連線到伺服器';
				$scope.success = false;
				$scope.hideMessage();
			});
	}

	$scope.hideMessage = function() {
		$timeout(function() {
			$scope.success = true;
			$scope.message = '';
		}, 2000);
	}

}]);

ctrlModule.controller('CreateActCtrl', ['$scope', '$timeout', '$location', 'ActService', function ($scope, $timeout, $location, ActService) {
	$scope.format = "dd-MM-yyyy";
	$scope.success = true;
	$scope.message = '';

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
		$scope.success = true;
		$scope.message = '';

		ActService.newActivity($scope.activity).
			success(function (data, status, headers, config) {
				$scope.success = data.success;
				
				if ($scope.success) {
					$scope.message = '儲存成功，1秒後返回主頁';
					$timeout(function() {
						$location.path('/admin');
					}, 1000);
				} else
					$scope.message = data.message;
			}).
			error(function (data, status, headers, config) {
				$scope.success = false;
				$scope.message = '無法連線到伺服器';
			});

	};
}]);

ctrlModule.controller('EditActCtrl', ['$scope', '$timeout', '$location', '$routeParams', 'ActService', function ($scope, $timeout, $location, $routeParams, ActService) {
	$scope.format = "dd-MM-yyyy";
	$scope.activityID = $routeParams.id;
	$scope.success = $scope.fail = false;
	$scope.message = '';

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

	$scope.findAct = function() {
		ActService.findActivity($scope.activityID).
			success(function (data, status, headers, config) {
				if (data.success)
					$scope.activity = data.activity;
				else {
					$scope.fail = true;
					$scope.message = data.message;
				}
			}).
			error(function (data, status, headers, config) {
				$scope.fail = true;
				$scope.message = '無法連線到伺服器';
			});
	}

	$scope.submit = function() {
		$scope.success = true;
		$scope.message = '';
		
		ActService.editActivity($scope.activity).
			success(function (data, status, headers, config) {
				$scope.success = data.success;

				if ($scope.success) {
					$scope.message = '儲存成功，1秒後返回主頁';
					$timeout(function() {
						$location.path('/admin');
					}, 1000);
				} else
					$scope.message = data.message;
			}).
			error(function (data, status, headers, config) {
				$scope.success = false;
				$scope.message = '無法連線到伺服器';
			});
	}
}]);
