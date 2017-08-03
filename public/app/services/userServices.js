angular.module('userServices', [])

.factory('User', ['$http',function($http) {
	userfactory = {};

	// User.create(regData)
	userfactory.create = function(regData) {
		return $http.post('/api/users',regData)
	}
	return userfactory;
}]);

// $http.post('/api/users',data).then(function(response){
// 			console.log('response',response);
// 			if(response.data.success){
// 				$scope.successMsg = response.data.message;
// 				$timeout(function(){
// 					$state.go('home');
// 				},2000);
// 			} else {
// 				$scope.errorMsg = response.data.message;
// 			}
// 		});