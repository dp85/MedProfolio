/**
 * Created by dave on 11/9/15.
 *
 * http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
 *
 */

// Authentication Service
(function() {
  var authFactory = function($q, $ionicPopup, $state) {

    var factory = {};

    factory.getUser = function() {
      return Parse.User.current();
    };

    factory.signup = function(first, last, email,
                              password) {
      var d = $q.defer();

      console.log('password:' + password);

      var user = new Parse.User();
      user.set('username', email.toLowerCase());
      user.set('firstname', first);
      user.set('lastname', last);
      user.set('email', email.toLowerCase());
      user.set('name', first + ' ' + last);
      user.set('password', password);

      user.signUp(null, {
        success: function (user) {
          console.log("Account Created");
          d.resolve(user);
        },
        error: function(user, error) {
          $ionicPopup.alert({
            title: 'Signup Error',
            subTitle: error.message
          });
          d.reject(error);
        }
      });

      return d.promise;
    };

    factory.login = function(email, password) {
      var d = $q.defer();

      Parse.User.logIn(email.toLowerCase(), password, {
        success: function(user) {
          console.log("Logged In");
          d.resolve(user);
        },
        error: function(user, error) {
          $ionicPopup.alert({
            title: 'Login Error',
            subTitle: error.message
          });
          d.reject(error);
        }
      });

      return d.promise;
    };

    factory.connectWithSession = function(sessionToken){
      Parse.User.become(sessionToken, null).then(function(user){
        // Logged in with session
        console.log("connected with existing session");
        $state.go("tab.home");
        return true;
      }, function(err){
        // Unable to connect with existing session
        console.log("unable to connect with existing session");
        console.log(err.message);
        return false;
      })
    };

    factory.logout = function() {
      Parse.User.logOut();
    };

    return factory;

  };

  authFactory.$inject = ['$q', '$ionicPopup', '$state'];
  angular.module('medprofolio').factory('AuthFactory', authFactory);

  console.log("authFactory");

}());
