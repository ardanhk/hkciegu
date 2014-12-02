var app = angular.module('orgComAdmin', ['ui.bootstrap', 'ngRoute', 'orgComAdmin.controllers', 'orgComAdmin.services', 'orgComAdmin.directives']);

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider.
			when('/admin', {
				templateUrl: '/admin/views/main.html'
			}).
			otherwise({
				redirectTo: '/admin'
			});
	}
]);