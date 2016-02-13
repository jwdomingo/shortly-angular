angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
	$scope.link = {};
  $scope.spinner = false;
  $scope.addLink = function (url) {
    $scope.link = {};
    $scope.spinner = true;
    Links.addOne(url)
    .then(function (link) {
      $scope.link = link.data;
      $scope.spinner = false;
    });
  };
});
