// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngMockE2E', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform, $httpBackend, $http) {


    var authorized = false;
    var customers = [{name: 'John Smith'}, {name: 'Tim Johnson'}];

    // returns the current list of customers or a 401 depending on authorization flag
    $httpBackend.whenGET('https://customers').respond(function (method, url, data, headers) {
      return authorized ? [200, customers] : [401];
    });
    $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
      authorized = true;
      return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
    });
    $httpBackend.whenPOST('https://logout').respond(function(method, url, data) {
      authorized = false;
      return [200];
    });
    // All other http requests will pass through
    $httpBackend.whenGET(/.*/).passThrough();

    $ionicPlatform.ready(function () {
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
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // Each tab has its own nav history stack:
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })

      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'templates/sign-up.html',
        controller: 'SignUpController'
      })

      //TABS

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller:'TabsCtrl'
      })

      .state('tab.home', {
        url: '/tabs-home',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tabs-home.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.camera', {
        url: '/tab-takepicture',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-takepicture.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
