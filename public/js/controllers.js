var ctrlModule = angular.module('orgCom.controllers', []);

ctrlModule.controller('mainCtrl', ['$scope', function($scope) {
	$scope.slides = [
		{image: '/img/slideshow/1.jpg', caption: '爭取權益，團結友愛！'},
		{image: '/img/slideshow/2.jpg', caption: '爭取權益，團結友愛！'},
		{image: '/img/slideshow/3.jpg', caption: '爭取權益，團結友愛！'}
	];

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
}]);