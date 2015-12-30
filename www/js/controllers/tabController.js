/**
 * Created by dave on 11/22/15.
 */


(function() {

  var TabController = function ($scope, $state, AuthFactory, $rootScope) {

    $scope.logout = function() {
      AuthFactory.logout();
      $state.go('login');
    };

  };

  TabController.$inject = ['$scope', '$state', 'AuthFactory', '$rootScope'];

  angular.module('medprofolio')
    .controller('TabController', TabController);


}());
