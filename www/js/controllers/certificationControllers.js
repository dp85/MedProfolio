/**
 * Created by dave on 11/14/15.
 */

(function() {

    var CertificationsController = function ($scope, $state, $ionicLoading, $ionicPopup, $ionicModal, DataFactory) {

        $scope.cert = {
            "title": "",
            "expiration": "",
            "issued": "",
            "notes": ""
        };

      $scope.user = {
        "firstname": "",
        "lastname": ""
      };

      $scope.user.firstname = DataFactory.getFirstname();
      $scope.user.lastname = DataFactory.getLastname();

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

      $scope.deleteCert = function(cert) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Certification',
          template: 'Are you sure you want delete ' + cert.attributes.title + '?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('delete confirmed');
            processDelete();

          } else {
            console.log('delete cancelled');
          }
        });

        function processDelete(){
          $ionicLoading.show();
          var promise = DataFactory.deleteCertification(cert);

          promise.then(function(cert){
            // Certification deleted
            console.log('deleted certification: ' + cert.attributes.title)
          }, function(error){
            // Failed to delete certification
            $ionicPopup.alert({
              title: "Error deleting Certification",
              subTitle: error.message
            });
          });
          $ionicLoading.hide();
        }
      };


      $ionicLoading.show();
      DataFactory.loadCertifications().then(function () {
        $scope.certifications = DataFactory.certifications;
        $ionicLoading.hide();
      });


      // Image Modal - For viewing a full-screen rendition of the image.


      $scope.hide = [{
        bars: true
      }];


      $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
        $scope.gridModal = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });

      $scope.openModal = function(src, title) {
        console.log(src);
        if(!src)
          return;

        $scope.imageSrc = src;
        $scope.certTitle = title;

        $scope.gridModal.show();
      };

      $scope.closeModal = function() {
        $scope.gridModal.hide();
        $scope.hide.bars = false;
      };




      //$ionicModal.fromTemplateUrl('templates/modal.html', {
      //  scope: $scope,
      //  animation: 'slide-in-up'
      //}).then(function(modal) {
      //  $scope.modal = modal;
      //});
      //
      //$scope.openModal = function() {
      //  $scope.modal.show();
      //};
      //
      //$scope.closeModal = function() {
      //  $scope.modal.hide();
      //};
      //
      ////Cleanup the modal when we're done with it!
      //$scope.$on('$destroy', function() {
      //  $scope.modal.remove();
      //});
      //// Execute action on hide modal
      //$scope.$on('modal.hide', function() {
      //  // Execute action
      //});
      //// Execute action on remove modal
      //$scope.$on('modal.removed', function() {
      //  // Execute action
      //});
      //$scope.$on('modal.shown', function() {
      //  console.log('Modal is shown!');
      //});
      //
      //$scope.showImage = function(src) {
      //  $scope.imageSrc = src;
      //
      //  $scope.openModal();
      //}



    };
    CertificationsController.$inject = ['$scope', '$state',  '$ionicLoading', '$ionicPopup', '$ionicModal', 'DataFactory'];

    angular.module('medprofolio')
        .controller('CertificationsController', CertificationsController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }


}());

(function() {

    var AddCertificationController = function ($scope, $state, $cordovaCamera, $ionicLoading, $ionicPopup, DataFactory) {

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

                  // Clear fields to enter new certification
                  $scope.newCert.title = "";
                  $scope.newCert.expiration = "";
                  $scope.newCert.issued = "";
                  $scope.newCert.notes = "";
                  $scope.newCert.image = null;

                });
              });
            }
        };

      $scope.takePhoto = function () {
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
         // allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 1000,
          targetHeight: 1000,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.newCert.image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          // An error occured. Show a message to the user
          $ionicPopup.alert({
            title: "Error adding photo",
            subTitle: "Sorry, there was an error when trying to add the photo."
          });
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
          $ionicPopup.alert({
            title: "Error adding photo",
            subTitle: "Sorry, there was an error when trying to add the photo."
          });
        });
      };

    };
    AddCertificationController.$inject = ['$scope', '$state', '$cordovaCamera', '$ionicLoading', '$ionicPopup', 'DataFactory'];

    angular.module('medprofolio')
        .controller('AddCertificationController', AddCertificationController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    console.log('AddCertificaiton controller');

}());
