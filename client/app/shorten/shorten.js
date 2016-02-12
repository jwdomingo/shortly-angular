angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
	$scope.link = {};
  $scope.addLink = Links.addOne;
});
