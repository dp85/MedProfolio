/**
 * Created by dave on 11/14/15.
 */

(function() {

    var CertificationsController = function ($scope, $ionicLoading, $state, DataFactory) {

        $scope.cert = {
            "title": "",
            "expiration": "",
            "issued": "",
            "notes": ""
        };

      $scope.dataFactory = DataFactory;

        $scope.addCert = function () {
          $state.go('tab.add-certification');
        };

      $scope.refreshCertifications = function() {
        $ionicLoading.show();
        DataFactory.loadCertifications().then(function () {
          $scope.certifications = DataFactory.certifications;
          $ionicLoading.hide();
        });
      };

      $ionicLoading.show();
      DataFactory.loadCertifications().then(function () {
        $scope.certifications = DataFactory.certifications;
        $ionicLoading.hide();
      });


        //$scope.user.firstname = DataFactory.getFirstname();
        //$scope.user.lastname = DataFactory.getLastname();
        //$scope.user.avatar = DataFactory.getAvatar();
        //
        //if(isBlank($scope.user.avatar))
        //    $scope.user.avatar = "av-3-cros.png";

    };
    CertificationsController.$inject = ['$scope', '$ionicLoading', '$state', 'DataFactory'];

    angular.module('medprofolio')
        .controller('CertificationsController', CertificationsController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }


}());

(function() {

    var AddCertificationController = function ($scope, $state, $cordovaCamera, $ionicLoading, DataFactory) {

        $scope.newCert = {
            "title": "",
            "expiration": "",
            "issued": "",
            "notes": "",
            "image": null
        };

        $scope.insertCert = function (form) {
            if(form.$valid) {
              console.log('AddCertificationController::insertCert');
              $ionicLoading.show();
              DataFactory.insertCertification($scope.newCert).then(function () {
                console.log('Saved Cert!');
                DataFactory.loadCertifications().then(function () {
                  $ionicLoading.hide();
                  $state.go("tab.certifications");
                });
              });
            }
        };

      $scope.takePhoto = function () {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.newCert.image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          // An error occured. Show a message to the user
        });
      };

      $scope.choosePhoto = function () {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.newCert.image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          // An error occured. Show a message to the user
        });
      };

    };
    AddCertificationController.$inject = ['$scope', '$state', '$cordovaCamera', '$ionicLoading', 'DataFactory'];

    angular.module('medprofolio')
        .controller('AddCertificationController', AddCertificationController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    console.log('AddCertificaiton controller');

}());
