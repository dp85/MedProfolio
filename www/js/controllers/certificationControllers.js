/**
 * Created by dave on 11/14/15.
 */

(function() {

    var CertificationsController = function ($scope, $state, $ionicLoading, $ionicPopup,
                                             $ionicModal, DataFactory, ReportSvc, $q,
                                             $rootScope, $ionicScrollDelegate) {

      console.log("In CertificationsController");
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

      function loadProfolio()
      {
        $ionicLoading.show();

        $scope.dataFactory = null;
        $scope.user.firstname = DataFactory.getFirstname();
        $scope.user.lastname = DataFactory.getLastname();


        DataFactory.loadCertifications().then(function () {
          $scope.certifications = DataFactory.certifications;
          $scope.dataFactory = DataFactory;
          $ionicLoading.hide();
          $ionicScrollDelegate.scrollTop(false);
        });
      }
      // for the first login, the event will not be heard because the
      // controller isn't loaded up yet
      loadProfolio();

      $rootScope.$on('login', function(event, args) {
        console.log('login event received');
        loadProfolio();
      });




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


      // PDF Export Functionality
      $scope.export = function() {


        function asyncLoadPDF(){
          var deferred = $q.defer();

          // Build the data that is needed for the content of the PDF.
          var profolio = {
            name: $scope.user.firstname + ' ' + $scope.user.lastname,
            certs: $scope.certifications
          };


          function getBase64Image(img, height, width) {
            // Create an empty canvas element
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            // Copy the image contents to the canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            // Get the data-URL formatted image
            // Firefox supports PNG and JPEG. You could check img.src to
            // guess the original format, but be aware the using "image/jpg"
            // will re-encode the image.
            var imgData = canvas.toDataURL("image/png");
            //console.log(dataURL);

            return imgData;
          }

          var certImageCount = profolio.certs.length;
          // Get the image data for each certification
          for(var i = 0; i < profolio.certs.length; i++){
            var imgEle = document.getElementById("certImage_" + i);
            var imageBase64 = null;
            if(imgEle.src) {
              var img = new Image();
              img.crossOrigin = "anonymous";
              img.src = imgEle.src.replace("https://files.parsetfss.com/",
                "https:\/\/medprofolio.parseapp.com\/images\/");
              imageBase64 = getBase64Image(imgEle, imgEle.naturalHeight, imgEle.naturalWidth);
            }
            profolio.certs[i].imageData = imageBase64;
          }

          //if no cordova, then running in browser and need to use dataURL and iframe
          if (!window.cordova) {
            ReportSvc.runReportDataURL(profolio)
              .then(function(dataURL) {
                //set the iframe source to the dataURL created
                console.log('report run in browser using dataURL and iframe');
                document.getElementById('pdfImage').src = dataURL;
                deferred.resolve();
              });
          }
          //if codrova, then running in device/emulator and able to save file and open w/ InAppBrowser
          else {
            ReportSvc.runReportAsync(profolio)
              .then(function(filePath) {
                //log the file location for debugging and oopen with inappbrowser
                console.log('report run on device using File plugin');
                console.log('ReportCtrl: Opening PDF File (' + filePath + ')');
                try {
                  cordova.plugins.disusered.open(filePath);
                }
                catch(e) {
                  deferred.reject(e);
                }
                deferred.resolve();
              }, function(e){
                deferred.reject(e);
              } );
          }

          return deferred.promise;

        }

        $ionicLoading.show({template: 'Generating PDF .. This may take several minutes'});
        var promise = asyncLoadPDF();
        promise.then(function(){
          $ionicLoading.hide();
          console.log('PDF success');
        }, function(e){
          $ionicLoading.hide();
          console.log('PDF Failed');

          $ionicPopup.alert({
            title: "PDF Error",
            subTitle: "Failed to create PDF. Try again and contact help@medprofolio.com if problem persists."
          });

        });
      };

      //reset the iframe to show the empty html page from app start
      function _clearReport() {
        document.getElementById('pdfImage').src = "empty.html";
      }

      // END PDF Export Functionality


    };
    CertificationsController.$inject = ['$scope', '$state',  '$ionicLoading', '$ionicPopup',
      '$ionicModal', 'DataFactory', 'ReportSvc', '$q', '$rootScope', '$ionicScrollDelegate'];

    angular.module('medprofolio')
        .controller('CertificationsController', CertificationsController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }


}());

(function() {

    var AddCertificationController = function ($scope, $state, $cordovaCamera, $ionicLoading, $ionicPopup,
                                               DataFactory) {

      // This is used so the back-button is displayed on tab-add-certification.html
      //https://forum.ionicframework.com/t/back-button-not-showing-when-coming-from-nested-pages-tabs/18019/6
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

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
    AddCertificationController.$inject = ['$scope', '$state', '$cordovaCamera', '$ionicLoading', '$ionicPopup',
      'DataFactory'];

    angular.module('medprofolio')
        .controller('AddCertificationController', AddCertificationController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    console.log('AddCertificaiton controller');

}());
