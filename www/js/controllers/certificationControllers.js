/**
 * Created by dave on 11/14/15.
 */

(function() {

    var CertificationsController = function ($scope, $state, DataFactory) {

        $scope.cert = {
            "title": "",
            "expiration": "",
            "issued": "",
            "notes": ""
        };

        $scope.addCert = function () {
          $state.go('tab.add-certification');
        };

        //$scope.user.firstname = DataFactory.getFirstname();
        //$scope.user.lastname = DataFactory.getLastname();
        //$scope.user.avatar = DataFactory.getAvatar();
        //
        //if(isBlank($scope.user.avatar))
        //    $scope.user.avatar = "av-3-cros.png";

    };
    CertificationsController.$inject = ['$scope', '$state', 'DataFactory'];

    angular.module('medprofolio')
        .controller('CertificationsController', CertificationsController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }


}());

(function() {

    var AddCertificationController = function ($scope, $state, DataFactory) {

        $scope.newCert = {
            "title": "",
            "expiration": "",
            "issued": "",
            "notes": ""
        };

        $scope.insertCert = function (form) {
            if(form.$valid)
                $state.go('add-certification');
        };

        //$scope.user.firstname = DataFactory.getFirstname();
        //$scope.user.lastname = DataFactory.getLastname();
        //$scope.user.avatar = DataFactory.getAvatar();
        //
        //if(isBlank($scope.user.avatar))
        //    $scope.user.avatar = "av-3-cros.png";

    };
    AddCertificationController.$inject = ['$scope', '$state', 'DataFactory'];

    angular.module('medprofolio')
        .controller('AddCertificationController', AddCertificationController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    console.log('AddCertificaiton controller');

}());