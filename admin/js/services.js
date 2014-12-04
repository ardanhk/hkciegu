var serviceModule = angular.module('orgComAdmin.services', []);

serviceModule.factory('ActService', function($http) {
	
	var actService = {};

	actService.getActivities = function () {
		return $http.get('/api/getActs');
	}

	actService.findActivity = function (id) {
		return $http.get('/api/findAct/' + id);
	}

	actService.newActivity = function (activity) {
		return $http.post('/api/newAct', activity);
	}

	return actService;
});