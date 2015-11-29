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
        .then(function(user) {
          console.log('LoginController::then');

          // Store session token in local storage.
          // this will be used to try to establish a session the next
          // time the user uses the app.
          if(user.getSessionToken()){
            $window.localStorage['parseSession'] = user.getSessionToken();
            console.log(user.getSessionToken());
          }

          $state.go('tab.home');
        });

    };

    $scope.go = function ( path ) {
      $state.go( path );
    };

  };
    LoginController.$inject = ['$scope', '$state', 'AuthFactory' ];

    angular.module('medprofolio')
      .controller('LoginController', LoginController);


}());


// SignupController

(function() {

  var SignupController = function ($scope, $state, $window, AuthFactory ) {

    $scope.newUser = {
      "firstname": "",
      "lastname": "",
      "email": "",
      "password": ""
    };

    $scope.signup = function() {
      console.log("SignupController::signup");
      AuthFactory.signup($scope.newUser.firstname, $scope.newUser.lastname,
        $scope.newUser.email, $scope.newUser.password)
        .then(function (user)
        {
          if(user.getSessionToken()){
            $window.localStorage['parseSession'] = user.getSessionToken();
            console.log(user.getSessionToken());
          }
          console.log("Created User");
          $state.go("tab.home");
        });

    };


  };
  SignupController.$inject = ['$scope', '$state', '$window', 'AuthFactory'];

  angular.module('medprofolio')
    .controller('SignupController', SignupController);


}());
