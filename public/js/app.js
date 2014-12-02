var app = angular.module('orgCom', ['ui.bootstrap', 'ngRoute', 'orgCom.controllers', 'orgCom.services', 'orgCom.directives']);

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
			otherwise({
				redirectTo: '/'
			});
	}
]);