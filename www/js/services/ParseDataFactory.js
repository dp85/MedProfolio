/**
 * Created by dave on 11/11/15.
 *
 * ParseDataFactory.js
 *
 * Used to get and set data from the Parse database
 */


(function() {
  var dataFactory = function($q, $ionicPopup) {

    //var parseUser = null;
    //
    //function loadParseUser(){
    //  if(parseUser == null)
    //    parseUser = Parse.User.current();
    //}

    var factory = {};

    //factory.getUser = function() {
    //  return Parse.User.current();
    //};

    factory.getFirstname = function() {
      return Parse.User.current().attributes.firstname;
    };

    factory.getLastname = function() {
      return Parse.User.current().attributes.lastname;
    };

    factory.getAvatar = function() {
      return Parse.User.current().attributes.avatar;
    }


    return factory;

  };

  dataFactory.$inject = ['$q', '$ionicPopup'];
  angular.module('medprofolio').factory('DataFactory', dataFactory);

  console.log("ParseDataFactory.js");

}());
