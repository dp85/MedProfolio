
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('medprofolio', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
    Parse.initialize("lKDwJG9Qo8V3lyXQVwgWIALsugOAiMNrBVb00Mwa", "6wXoohdVOs7NdQNJXf3ea4DlI6zATU7ASgQ3vI1c");

  })

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url:'/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

    .state('signup', {
      url:'/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupController'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeController'
      }
    }
  })

  .state('tab.prodev', {
      url: '/prodev',
      views: {
        'tab-prodev': {
          templateUrl: 'templates/tab-prodev.html',
          controller: 'ProDevCtrl'
        }
      }
    })

    .state('tab.jobs', {
      url: '/jobs',
      views: {
        'tab-jobs': {
          templateUrl: 'templates/tab-jobs.html',
          controller: 'JobsCtrl'
        }
      }
    })

    .state('tab.certifications', {
      url: '/certifications',
      views: {
        'tab-certifications': {
          templateUrl: 'templates/tab-certifications.html',
          controller: 'CertificationsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
