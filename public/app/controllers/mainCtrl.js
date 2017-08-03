angular.module('mainController', [])
.controller('mainCtrl', ['$scope','$http', '$state', '$timeout', 'Auth', function($scope,$http,$state,$timeout,Auth){
	// $scope.loginData = {
	// 	email : '',
	// 	password: '',
	// 	username: ''
	// };

	$scope.doLogin = function(data) {
		$scope.successMsg = null;
		$scope.loading = true;
		$scope.errorMsg = null;

		Auth.login(data).then(function(response){
			console.log('response',response);
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
}])