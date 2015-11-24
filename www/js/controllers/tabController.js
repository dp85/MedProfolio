/**
 * Created by dave on 11/22/15.
 */


(function() {

  var TabController = function ($scope, $state, AuthFactory) {

    $scope.logout = function() {
      AuthFactory.logout();
      $state.go('login');
    };

  };

  TabController.$inject = ['$scope', '$state', 'AuthFactory'];

  angular.module('medprofolio')
    .controller('TabController', TabController);


}());
