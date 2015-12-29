/**
 * Created by dave on 11/7/15.
 *
 * Contains the controllers for Authentication logic
 *
 */

// LoginController

(function() {

  var LoginController = function ($scope, $state, $window, AuthFactory) {

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
          $scope.loginCreds.email = "";
          $scope.loginCreds.password = "";

          $state.go('tab.home');
        }, function(error){
          console.log('Invalid Login');
          $scope.loginCreds.password = "";
        });

    };

    $scope.go = function ( path ) {
      $state.go( path );
    };

  };
    LoginController.$inject = ['$scope', '$state', '$window', 'AuthFactory' ];

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


(function(){

  var ForgotPasswordController = function ($scope, $state, $ionicLoading){

    $scope.user = {};
    $scope.error = {};
    $scope.state = {
      success: false
    };

    $scope.reset = function() {
      $scope.loading = $ionicLoading.show({
        content: 'Sending',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      Parse.User.requestPasswordReset($scope.user.email, {
        success: function () {
          // TODO: show success
          $ionicLoading.hide();
          $scope.state.success = true;
          $scope.$apply();
        },
        error: function (err) {
          $ionicLoading.hide();
          if (err.code === 125) {
            $scope.error.message = 'Email address does not exist';
          } else {
            $scope.error.message = 'An unknown error has occurred, ' +
              'please try again';
          }
          $scope.$apply();
        }
      });
    };

    $scope.login = function() {
      $state.go('login');
    };
  };

  ForgotPasswordController.$inject = ['$scope', '$state', '$ionicLoading'];

  angular.module('medprofolio')
    .controller('ForgotPasswordController', ForgotPasswordController);

}());
