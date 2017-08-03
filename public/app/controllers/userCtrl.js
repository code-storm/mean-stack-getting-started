angular.module('userControllers',[])

.controller('regCtrl', ['$scope','$http', '$state', '$timeout', 'User', function($scope,$http,$state,$timeout,User){
	console.log('regCtrl is running');
	$scope.regUser = function(regData) {
		$scope.successMsg = null;
		$scope.errorMsg = null;
		$scope.loading = true;
		
		User.create(regData).then(function(response){
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
	$scope.regData = {
		email : '',
		password: '',
		username: ''
	};
}])