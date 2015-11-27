/**
 * Created by dave on 11/11/15.
 *
 * ParseDataFactory.js
 *
 * Used to get and set data from the Parse database
 */


(function() {
  var dataFactory = function($q, $ionicPopup) {


    var factory = {};


    factory.getFirstname = function() {
      return Parse.User.current().attributes.firstname;
    };

    factory.getLastname = function() {
      return Parse.User.current().attributes.lastname;
    };

    factory.getAvatar = function() {
      return Parse.User.current().attributes.avatar;
    };

    factory.insertCertification = function(newCert){

     // Create the deferred task - https://docs.angularjs.org/api/ng/service/$q
      var d = $q.defer();

      var CertType = Parse.Object.extend("Certification");
      var currentUser = Parse.User.current();
      var file = newCert.image ? new Parse.File("image.jpg", {base64: newCert.image}) : null;

      // Check dates
      newCert.expiration = checkDate(newCert.expiration);
      newCert.issued = checkDate(newCert.issued);

      var cert = new CertType();
      cert.set("owner", currentUser);
      cert.set("image", file);
      cert.set("title", newCert.title);
      cert.set("expiration", newCert.expiration);
      cert.set("issued", newCert.issued);
      cert.set("notes", newCert.notes);
      cert.set("created", new Date());

      cert.save(null, {
        success: function (cert) {
          console.log("Certification Added");
          // resolve/fulfill the deferred task
          d.resolve(cert);
        },
        error: function (item, error) {
          $ionicPopup.alert({
            title: "Error saving Certification",
            subTitle: error.message
          });
          // reject the deferred task
          d.reject(error);
        }
      });

      // return the promise so interested parties can get access to the result
      // of the deferred task when it completes
      return d.promise;


      function checkDate(date){
        console.log('date check');
        if(isNaN(new Date(date))) {
          console.log("bad date");
          return null;
        } else {
          console.log("date good");
          return date;
        }
      }

    };

    factory.certifications = [];

    factory.loadCertifications = function(){
      var d= $q.defer();

      var currentUser = Parse.User.current();

      var CertType = Parse.Object.extend("Certification");
      var certQuery = new Parse.Query(CertType);
      certQuery.ascending('expiration');
      certQuery.equalTo("owner", currentUser);

      certQuery.find({
        success: function (results) {
          factory.certifications = results;

          console.debug(factory.certifications);

          d.resolve();
        }
      });

      return d.promise;
    };

    factory.deleteCertification = function(cert){

      var d = $q.defer();

      cert.destroy({
        success: function(myObject) {
          // Object was deleted from Parse Cloud.

          // Remove it from the certification collection.
          var index = factory.certifications.indexOf(cert);
          if(index > -1){
            factory.certifications.splice(index, 1);
          }
          d.resolve(cert);
        },
        error: function (myObject, error) {
         // The delete failed.
          d.reject(error);
        }
      });

      return d.promise;

    };


    return factory;

  };

  dataFactory.$inject = ['$q', '$ionicPopup'];
  angular.module('medprofolio').factory('DataFactory', dataFactory);

  console.log("ParseDataFactory.js");

}());
