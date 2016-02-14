angular.module('shortly.links', [])
.controller('LinksController', function ($scope, Links) {
  $scope.data = {};
  $scope.searchString = $scope.$parent.serachString;
  Links.getAll()
  .then(function (links) {
    $scope.data.links = links;
  });
})
.controller('SearchController', function ($scope) {
  $scope.search = {};
});
