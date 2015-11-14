/**
 * Created by dave on 11/11/15.
 */


(function() {

  var HomeController = function ($scope, $state, DataFactory) {

    $scope.user = {
      "firstname": "",
      "lastname": "",
      "avatar": ""
    };

    $scope.user.firstname = DataFactory.getFirstname();
    $scope.user.lastname = DataFactory.getLastname();
    $scope.user.avatar = DataFactory.getAvatar();

    if(isBlank($scope.user.avatar))
      $scope.user.avatar = "av-3-cros.png";

  };
  HomeController.$inject = ['$scope', '$state', 'DataFactory'];

  angular.module('medprofolio')
    .controller('HomeController', HomeController);


    // Returns true if a string is
    // null, undefined or blank.
    function isBlank(str) {
      return (!str || /^\s*$/.test(str));
    }


}());

