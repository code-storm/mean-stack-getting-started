angular.module('authServices', [])

.factory('Auth', ['$http','AuthToken', function($http,AuthToken){
	var authFactory = {};

	authFactory.login = function(loginData) {
		return $http.post('/api/authenticate',loginData).then(function(response) {
			AuthToken.setToken(response.data.token);
			return response;
		});
	};

	authFactory.isLoggedIn = function () {
		if(AuthToken.getToken()) {
			return true;
		} else {
			return false;
		}
	};

	//Auth.logout();
	authFactory.logout = function () {
		AuthToken.setToken();
	};

	//Auth.getUser();
	authFactory.getUser = function () {
		if(AuthToken.getToken()) {
			return $http.post('/api/me');
		} else {
			$q.reject({ message: 'User has no token'});
		}
	}

	return authFactory;
}])

.factory('AuthToken',["$window",function ($window) {
	var authTokenFactory = {};

	// AuthToken.setToken(token);
	authTokenFactory.setToken = function (token) {
		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	};

	// AuthToken.getToken();
	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};


	return authTokenFactory;
}])

.factory('AuthInterceptors', ["AuthToken",function(AuthToken){
	var authInterceptorsFactory = {};

	authInterceptorsFactory.request = function(config) {
		var token = AuthToken.getToken();

		if(token)
			config.headers['x-access-token'] = token;

		return config;
	}


	return authInterceptorsFactory;
}])