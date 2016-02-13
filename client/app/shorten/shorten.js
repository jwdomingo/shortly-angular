angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
	$scope.serverMessage = "";
  $scope.link = {};
  $scope.spinner = false;
  $scope.addLink = function (url) {  
    $scope.serverMessage = "";
    $scope.link = {};
    $scope.spinner = true;
    Links.addOne(url)
    .then(function (link) {
      $scope.link = link.data;
      $scope.spinner = false;
    })
    .catch(function (err) {
      $scope.spinner = false;
      $scope.serverMessage = err.data.error;
    });
  };

  $scope.message = function() {
    if ($scope.serverMessage) {
      return $scope.serverMessage;
    } else if ($scope.shortenForm.url.$invalid) {
      return "Please enter a valid URL";
    }
  }
});
