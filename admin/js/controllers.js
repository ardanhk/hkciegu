var ctrlModule = angular.module('orgComAdmin.controllers', []);

ctrlModule.controller('LogoutCtrl', ['', function () {
	localStorage.clearAll();
	window.location = '/logout';
}]);