angular.module('mainController', [])
.controller('mainCtrl', ['$scope','$http', '$state', '$timeout', 'Auth', function($scope,$http,$state,$timeout,Auth){
	// $scope.loginData = {
	// 	email : '',
	// 	password: '',
	// 	username: ''
	// };
	if(Auth.isLoggedIn()) {
		console.log("Success: User is logged in");
		Auth.getUser().then(function(response) {
			console.log(response);
			$scope.username = response.data.username;
			$scope.email = response.data.email;
		})
	} else {
		console.log("Failure: User is not logged in");
		$scope.username = '';
	}

	$scope.doLogin = function(data) {
		$scope.successMsg = null;
		$scope.loading = true;
		$scope.errorMsg = null;

		Auth.login(data).then(function(response){
			console.log('response',response);
			$scope.username = response.config.data.username;
			if(response.data.success){
				$scope.successMsg = response.data.message;
				$timeout(function(){
					$state.go('home');
				},2000);
			} else {
				$scope.errorMsg = response.data.message;
			}
			$scope.loading = false;

		});
	};

	$scope.logout = function () {
		$scope.username = '';
		Auth.logout();
		$timeout(function () {
			$state.go('home');
		},2000);
	}
}])