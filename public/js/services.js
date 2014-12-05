var serviceModule = angular.module('orgCom.services', []);

serviceModule.factory('OrgService', function ($http, $rootScope) {
	var orgService = {};

	orgService.findOrg = function () {
		var path = '/api/findOrg/';
		if ($rootScope.orgId != undefined && $rootScope.orgId != null)
			path += $rootScope.orgId;
		return $http.get(path);
	};

	return orgService;
});

serviceModule.factory('ActService', function ($http) {

	var actService = {};

	actService.latestActivities = function () {
		return $http.get('/api/latestActs');
	};

	actService.getActivities = function () {
		return $http.get('/api/getActs');
	};

	actService.findActivity = function (id) {
		return $http.get('/api/findAct/' + id);
	};

	return actService;

});

serviceModule.factory('AppService', function ($http) {

	var appService = {};

	

	return appService;

});