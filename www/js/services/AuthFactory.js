/**
 * Created by dave on 11/9/15.
 *
 * http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
 *
 */

// Authentication Service
(function() {
  var authFactory = function($q, $ionicPopup) {

    var factory = {};

    factory.getUser = function() {
      return Parse.User.current();
    }

    factory.signup = function(first, last, email,
                              password, avatar) {
      var d = $q.defer();

      console.log('password:' + password);

      var user = new Parse.User();
      user.set('username', email);
      user.set('firstname', first);
      user.set('lastname', last);
      user.set('email', email);
      user.set('name', first + ' ' + last);
      user.set('password', password);
      user.set('avatar', avatar);

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
    }

    factory.login = function(email, password) {
      var d = $q.defer();

      Parse.User.logIn(email, password, {
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
    }

    return factory;

  };

  authFactory.$inject = ['$q', '$ionicPopup'];
  angular.module('medprofolio').factory('AuthFactory', authFactory);

  console.log("authFactory");

}());
