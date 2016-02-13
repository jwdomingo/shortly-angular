// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.getUser = function () {
    Auth.getUser({username: $scope.user.username})
      .then(function (user) {
        console.log('AUTH user:', JSON.stringify(user));
        if (user) {
          $scope.userExists = true;
        } else {
          $scope.userExists = false;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
