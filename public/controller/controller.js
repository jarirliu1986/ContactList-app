var myApp = angular.module('myApp', []);
	myApp.controller('AppCtrl',['$scope','$http', function ($scope,$http) {
		console.log("hello from controller");
		var refresh = function () {
			$http.get('/contactlist').success(function(response) {
				console.log("I have received a response from server");
				$scope.contactlist = response;
				$scope.contact = "";
			});
		};
		
		refresh();

		$scope.addContact = function(){
			console.log($scope.contact);
			$http.post('/contactlist', $scope.contact).success(function(response){
				console.log(response);
				refresh();
			});
		};

		$scope.remove = function (id) {
			console.log(id);
			$http.delete('/contactlist/' + id).success(function (response) {
				refresh();
			});
			$scope.addSwitch = false;
		};
		$scope.edit = function (id) {
			console.log(id);
			
			$scope.addSwitch = true;
			
			$http.get('/contactlist/'+id).success(function (response) {
				$scope.contact = response;
			});
		};

		$scope.update = function () {
			console.log($scope.contact._id);
			$http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function (response) {
				refresh();
			})
			$scope.addSwitch = false;
		};

		$scope.deselect = function () {
			$scope.contact="";
			$scope.addSwitch = false;
		}
		
	}]);