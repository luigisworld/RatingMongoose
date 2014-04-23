var picture = angular.module('picture',[]);

function pictureCtrl($scope, $http){

	$http({    
		url: '/pictures',    
		method: "GET",
	}).success(function(data){
		$scope.pictures = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	}); 
	
	//when user clicks in like button
	$scope.like = function(picture){
		$http({    
			url: '/pictures/'+picture._id,    
			method: "POST"  
		}).success(function (data) {
			$scope.pictures = data;
		}).error(function (data) {    
			console.log('Error: ' + data);    
		}); 
	}
	
	    
}