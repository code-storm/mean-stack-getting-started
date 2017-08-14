angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate', 'mainController', 'authServices'])

.config(["$httpProvider",function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
}])
//app.controller('', ctr1);