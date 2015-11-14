/**
 * Created by dave on 11/7/15.
 *
 * Contains the controllers for Authentication logic
 *
 */

// LoginController

(function() {

  var LoginController = function ($scope, $state, AuthFactory) {

    $scope.loginCreds = {
      "email": "",
      "password": ""
    };

    $scope.login = function (creds) {
      console.log('LoginContoller::signIn');
      console.log(creds.email);
      console.log(creds.password);
      AuthFactory.login(creds.email, creds.password)
        .then(function() {
          console.log('LoginController::then');
          $state.go('tab.home');
        });

    };

    $scope.go = function ( path ) {
      $state.go( path );
    };

  }
    LoginController.$inject = ['$scope', '$state', 'AuthFactory'];

    angular.module('medprofolio')
      .controller('LoginController', LoginController);


}());


// SignupController

(function() {

  var SignupController = function ($scope, $state, AuthFactory ) {

    $scope.newUser = {
      "firstname": "",
      "lastname": "",
      "email": "",
      "password": "",
      "avatar": ""
    };

    $scope.signup = function() {
      console.log("SignupController::signup");
      AuthFactory.signup($scope.newUser.firstname, $scope.newUser.lastname,
        $scope.newUser.email, $scope.newUser.password, $scope.newUser.avatar)
        .then(function ()
        {
          console.log("Created User");
          $state.go("tab.home");
        });

    };


  }
  SignupController.$inject = ['$scope', '$state', 'AuthFactory'];

  angular.module('medprofolio')
    .controller('SignupController', SignupController);


}());
