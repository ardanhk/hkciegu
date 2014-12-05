var app = angular.module('orgCom', ['ui.bootstrap', 'ngRoute', 'orgCom.controllers', 'orgCom.services', 'orgCom.directives']);

app.run(['$rootScope', 'OrgService', function ($rootScope, OrgService) {
	OrgService.findOrg().
		success(function (data, status, headers, config) {
			if (data.success)
				$rootScope.organization = data.organization;
			else
				$rootScope.message = data.message;
		}).
		error(function (data, status, headers, config) {
			$rootScope.message = '無法連接伺服器';
		});
}]);

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider.
			when('/', {
				templateUrl: '/views/main.html',
				controller: 'mainCtrl'
			}).
			when('/unionIntro', {
				templateUrl: '/views/unionIntro.html'
			}).
			when('/unionStruc', {
				templateUrl: '/views/unionStruc.html'
			}).
			when('/service', {
				templateUrl: '/views/service.html'
			}).
			when('/download', {
				templateUrl: '/views/download.html'
			}).
			when('/link', {
				templateUrl: '/views/link.html'
			}).
			when('/new', {
				templateUrl: '/views/new.html',
				controller: 'newCtrl'
			}).
			when('/new/:id', {
				templateUrl: '/views/newDetail.html',
				controller: 'newDetailCtrl'
			}).
			when('/application/:id', {
				templateUrl: '/views/application.html',
				controller: 'applicationCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);