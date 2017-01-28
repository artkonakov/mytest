// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'starter.services', 'ionic.contrib.ui.hscrollcards'])

.run(function($ionicPlatform, $rootScope, AccountService) {

  AccountService.currentUser()
    .then(function(user) {
      $rootScope.user = user;
    })

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    document.addEventListener('deviceready', function () {
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal.init("e38a1b51-8ab8-46c8-aa56-2d3180beaa44",
                                     {googleProjectNumber: "468943060955"},
                                     notificationOpenedCallback);

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(false);
    }, false);



  });


})

.constant('$ionicLoadingConfig', {
  template: "<ion-spinner></ion-spinner>",
  hideOnStateChange: false
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: "MainController",
      controllerAs: "home"
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: "AccountController",
      controllerAs: "account"
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: "AccountController",
      controllerAs: "account"
    })
    .state('tasks', {
      cache: false,
      url: '/tasks',
      templateUrl: 'templates/tasks.html',
      controller: "HomeController",
      controllerAs: "task"
    })
    .state('new', {
      url: '/new',
      templateUrl: 'templates/new.html',
      controller: "TaskController",
      controllerAs: "new"
    })
    .state('item', {
      url: '/item/:id',
      templateUrl: 'templates/item.html',
      controller: "ItemController",
      controllerAs: "item"
    })
  



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
