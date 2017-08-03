angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate', 'mainController', 'authServices'])

.config(function () {
	console.log('config is ready');
})
//app.controller('', ctr1);