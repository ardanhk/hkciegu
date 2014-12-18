var app = angular.module('orgComAdmin', ['ui.bootstrap', 'ngRoute', 'orgComAdmin.controllers', 'orgComAdmin.services', 'orgComAdmin.directives']);

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider.
			when('/admin', {
				templateUrl: '/admin/views/main.html',
				controller: 'MainCtrl'
			}).
			when('/application', {
				templateUrl: '/admin/views/application.html'
			}).
			when('/createAct', {
				templateUrl: '/admin/views/createAct.html',
				controller: 'CreateActCtrl'
			}).
			when('/editAct/:id', {
				templateUrl: '/admin/views/editAct.html',
				controller: 'EditActCtrl'
			}).
			when('/uploader', {
				templateUrl: '/admin/views//uploader.html',
				controller: 'UploaderCtrl'
			}).
			otherwise({
				redirectTo: '/admin'
			});
	}
]);