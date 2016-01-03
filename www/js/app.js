// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('medprofolio', ['ionic', 'ngMessages', 'ngCordova'])

  .run(function ($ionicPlatform, $state, AuthFactory) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }

      if (window.StatusBar) {

        // org.apache.cordova.statusbar required
        // StatusBar.styleLightContent();
         window.StatusBar.styleDefault();

      }

    });
    Parse.initialize("lKDwJG9Qo8V3lyXQVwgWIALsugOAiMNrBVb00Mwa", "6wXoohdVOs7NdQNJXf3ea4DlI6zATU7ASgQ3vI1c");

    // See if there is an existing user
    //var currentUser = Parse.User.current();
    //if(currentUser)
    //  $state.go("tab.home");

    if(window.localStorage && window.localStorage.getItem('parseSession')) {
      var s = window.localStorage.getItem('parseSession');
      console.log(s);
      if(AuthFactory.connectWithSession(s))
        $state.go("tab.certifications");
    }

  })


  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    $stateProvider

      .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })

      .state('signup', {
        cache: false,
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupController'
      })

      .state('forgot', {
        cache: false,
        url: '/forgot',
        templateUrl: 'templates/forgot.html',
        controller: 'ForgotPasswordController'
      })

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabController'
      })

      // Each tab has its own nav history stack:


      .state('tab.certifications', {
        url: '/certifications',
        views: {
          'tab-certifications': {
            templateUrl: 'templates/tab-certifications.html',
            controller: 'CertificationsController'
          }
        }
      })

      .state('tab.add-certification', {
        cache: false,
        url: '/add-certification',
        views: {
          'tab-add-certification': {
            templateUrl: 'templates/tab-add-certification.html',
            controller: 'AddCertificationController'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
