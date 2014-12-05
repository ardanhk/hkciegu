var ctrlModule = angular.module('orgCom.controllers', []);

ctrlModule.controller('mainCtrl', ['$scope', 'ActService', function ($scope, ActService) {
	
	$scope.groups = [
		{image: '/img/group/org2/Logo.png', title: '坭水'},
		{image: '/img/group/org3/Logo.png', title: '木匠'},
		{image: '/img/group/org4/Logo.png', title: '油漆'},
		{image: '/img/group/org5/Logo.png', title: '喉管'},
		{image: '/img/group/org6/Logo.png', title: '搭棚'},
		{image: '/img/group/org10/Logo.png', title: '機協'},
		{image: '/img/group/org12/Logo.png', title: '水泥'},
		{image: '/img/group/org18/Logo.png', title: '通架'},
		{image: '/img/group/org20/Logo.png', title: '文職'},
		{image: '/img/group/org21/Logo.png', title: '承僱'}		
	];

	$scope.activities = [];

	$scope.latestActs = function() {
		ActService.latestActivities().
			success(function (data, status, headers, config) {
				$scope.activities = data.activities;
			}).
			error(function (data, status, headers, config) {
				console.error(data);
			});
	};

}]);

ctrlModule.controller('newCtrl', ['$scope', 'ActService', function ($scope, ActService) {
	$scope.activities = [];

	$scope.getActs = function() {
		ActService.getActivities().
			success(function (data, status, headers, config) {
				$scope.activities = data.activities;
			}).
			error(function (data, status, headers, config) {
				console.error(data);
			});
	};
}]);

ctrlModule.controller('newDetailCtrl', ['$scope', '$routeParams', 'ActService', function ($scope, $routeParams, ActService) {
	$scope.activityID = $routeParams.id;

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
}]);

ctrlModule.controller('applicationCtrl', ['$scope', '$routeParams', 'ActService', 'AppService', function ($scope, $routeParams, ActService, AppService) {
	$scope.activityID = $routeParams.id;

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
}]);
